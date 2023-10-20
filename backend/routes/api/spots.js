const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage} = require('../../db/models');
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotInput = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('city is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('state is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .isFloat({ min: -90, max: 90})
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .isFloat({ min: -180, max: 180})
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .isFloat({ gt:0 })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];

const validateReviewInput = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Review text is required'),
    check('stars')
      .isInt({ min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//### Get all Spots - done
router.get(`/`, async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [{model: Review}, {model:SpotImage}]
        //alex sugguestion including attributes of model.reviews, pass in the array. to get the averg.
    })

    //loop through each spot to find the ratings and preview
    const spotsWithAvgRatingAndPreview = spots.map((spot) => {
        const reviews = spot.Reviews;
        //console.log(reviews)
        //loop throgh reviews array, add all the review.stars together in each review/element
        const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
        //calculate the average
        const avgRating = totalRating / reviews.length
        //extract preview url from spotImage obj
        const previewImg = spot.SpotImages[0].url
        //console.log(previewImg)

        //create the new spotsWithRatingAndPreview Obj
        //parse the data into num.
        return {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating,
            previewImage: previewImg
        };
    })

    res.json({spots: spotsWithAvgRatingAndPreview});
});

//### Get all Spots owned by the Current User
router.get(`/current`, requireAuth, async (req, res, next) => {
    const id = req.user.id
    //find spots where ownerId = current user, also include associated model review and spotimage.
    const spots = await Spot.findAll({
        include: [{model: Review}, {model:SpotImage}],
        where: { ownerId: id}
    })

    const spotsWithAvgRatingAndPreview = spots.map((spot) => {
        const reviews = spot.Reviews;
        const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
        const avgRating = totalRating / reviews.length
        const previewImg = spot.SpotImages[0].url
        return {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating,
            previewImage: previewImg
        };
    })

    res.json({spots: spotsWithAvgRatingAndPreview});
});

//### Get details of a Spot from an id
router.get(`/:spotId`, async (req, res, next) => {
    const id = req.params.spotId
    //find spots where ownerId = current user, also include associated model review and spotimage.
    try {
        let spot = await Spot.findOne({
            include: [{model: SpotImage}, {model:Review}, {model:User}],
            where: {id}
        })

        //filter out attributes not needed for img array
        const imgsForSpot = spot.SpotImages
        const filteredImgsForSpot = imgsForSpot.map(img => ({
            id: img.id,
            url: img.url,
            preview: img.preview
        }))

        //filter out attributes not needed for img array, should I used default scoping? where would i apply it
        let filteredOwner = spot.User
        filteredOwner = {
            id: filteredOwner.id,
            firstName: filteredOwner.firstName,
            lastName: filteredOwner.lastName
        }

        const reviews = spot.Reviews;
        const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
        const avgRating = totalRating / reviews.length;
        const numReviews = reviews.length;

        spot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews: numReviews,
            avgRating: avgRating,
            SpotImages: filteredImgsForSpot,
            Owner: filteredOwner
        };
        res.json(spot);
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }

});

//### Create a Spot, should i use validation through model or custom validate?
router.post(`/`, requireAuth, validateSpotInput, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.status(201).json(newSpot);
});

//### Add an Image to a Spot based on the Spot's id
router.post(`/:spotId/images`, requireAuth,  async (req, res, next) => {
    const { url, preview } = req.body;
    const id = req.params.spotId;

    try {
        const spot = await Spot.findOne({where: {id}})

        let newImg = await SpotImage.create({
            spotId: spot.id,
            url,
            preview
        });

        //should i use default scoping?
        newImg = {
            id: newImg.id,
            url,
            preview
        }
        res.status(200).json(newImg);
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});

//### Edit a Spot
router.put(`/:spotId`, requireAuth, validateSpotInput, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const id = req.params.spotId
    const ownerId = req.user.id

    try {
        const spotSelected = await Spot.findOne({where: {id}})

        //check Authorization comparing ownderId from the current user to the ownerId in the spot selected.
        if(ownerId !== spotSelected.ownerId) {res.status(403).json({message: `Forbidden`})};
        //console.log(`is this called?`)
        spotSelected.set({
            ownerId: ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        //console.log(`is this called 2`)
        await spotSelected.save()
        //console.log(`is this called 3`)
        res.status(200).json(spotSelected);
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});

//### Delete a Spot
router.delete(`/:spotId/`, requireAuth, async (req, res, next) => {

    const id = req.params.spotId
    const ownerId = req.user.id

    try {
        const spotSelected = await Spot.findOne({where: {id}})

        //check Authorization by comparing ownderId from the current user to the ownerId in the spot selected.
        if(ownerId !== spotSelected.ownerId) {res.status(403).json({message: `Forbidden`})};

        await spotSelected.destroy();

        res.status(200).json({message: `Successfully deleted`});
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});


//### Get all Reviews by a Spot's id
router.get(`/:spotId/reviews`, async (req, res, next) => {

    const spotId = req.params.spotId

    try {
        //check if the spot exist
        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            const err = new Error(`Spot couldn't be found`);
            err.status = 404;
            return next(err);
        }

        const reviews = await Review.findAll({
            where: { spotId },
            include: [
                {model: User, attributes: { exclude: [`username`, `email`, `hashedPassword`, `createdAt`, `updatedAt`]}},
                {model: ReviewImage, attributes: { exclude: [`reviewId`, `createdAt`, `updatedAt`]}}
            ]
        });

        res.status(200).json({reviews});
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});



//### Create a Review for a Spot based on the Spot's id
router.post(`/:spotId/reviews`, requireAuth, validateReviewInput, async (req, res, next) => {

    const { review, stars } = req.body;
    const spotId = req.params.spotId
    const userId = req.user.id

    //check to see if the spot exist
    const spotSelected = await Spot.findByPk(spotId, {include: Review})

    if(!spotSelected) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }

    //check to see if current user has a review for the spotSelected
    const existingReview = await Review.findOne({where: {userId, spotId}})

    if(existingReview) {
        const err = new Error(`User already has a review for this spot`);
        err.status = 500;
        return next(err);
    }

    //create the review for the spot
    let newReview = await Review.create({
        userId,
        spotId,
        review,
        stars,
    });

    res.status(201).json(newReview);

});




module.exports = router;
