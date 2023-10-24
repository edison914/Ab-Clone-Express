const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking} = require('../../db/models');
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors, handleValidationQueryErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotInput = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
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

const validateDatesInput = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value) => {
            const today = new Date();
            const selectedStartDate = new Date(value);
            if (selectedStartDate < today) {
                throw new Error('startDate cannot be in the past');
            }
            return true;
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value, { req }) => {
            const selectedStartDate = new Date(req.body.startDate);
            const selectedEndDate = new Date(value);
            if (selectedEndDate <= selectedStartDate) {
                throw new Error('endDate cannot be on or before startDate');
            }
            return true;
        }),
    handleValidationErrors
];

const validateSpotQuery = [
    check('page')
        .isInt({min: 1})
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .isInt({min: 1})
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional()
        .isFloat({max: 90})
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat({min: -90})
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional()
        .isFloat({max: 180})
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({min: -180})
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationQueryErrors
];


//### Get all Spots
//## Add Query Filters to Get All Spots
router.get(`/`, validateSpotQuery, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    //create a where obj where it contains all the params from URL
    const where = {};

    //required query params, use page and size if url contains page and size query
    if (page && size) {

        let offset = (page -1) * size;
        //optinal query params
        // if either minLat or maxLat param is given
        if(minLat || maxLat) {
            //set where claus attribute, lat is between minLat and maxLat. Set a default min or Lat if one is not given
            if(!minLat) minLat = -90;
            if(!maxLat) maxLat = 90
            where.lat = { [Op.between]: [minLat, maxLat]}
            console.log(where.lat);
        }

        if(minLng || maxLng) {
            if(!minLng) minLng = -180;
            if(!maxLng) maxLng = 180
            where.lng = { [Op.between]: [minLng, maxLng]}
            console.log(where.lng);
        }

        if(minPrice || maxPrice) {
            if(!minPrice) minPrice = 0;
            if(!maxPrice) maxPrice = Number.MAX_VALUE
            where.price = { [Op.between]: [minPrice, maxPrice]}
        }

        const spots = await Spot.findAll({
            where,
            limit: size,
            offset,
            include: [{model: Review}, {model:SpotImage}]
        })
        //loop through each spot to find the ratings and preview
        //create an empty arr
        let spotsList = [];
        //loop through spots, change each spot to JSON, then add them to the spotsList
        spots.forEach(spot => { spotsList.push(spot.toJSON())})
        //loop through spotsList
        spotsList.forEach(spot => {
            //find reviews for spot, calculate the avg rating, then assign the avg rating to each.
            const reviews = spot.Reviews;
            const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
            const avgRating = totalRating / reviews.length;
            spot.avgRating = avgRating;
            //find the FIRST image for spot, if FIRST img preview is true, then assign previewImage to url
            if(spot.SpotImages[0].preview) {
                const previewImg = spot.SpotImages[0].url
                spot.previewImage = previewImg
            //else, if img preview is false, then assign previewImage with comment
            } else {
                spot.previewImage = 'Preview is not allowed'
            }
            //remove the include of Reviews and SpotImages
            delete spot.Reviews;
            delete spot.SpotImages;
        })
        return res.json({Spots: spotsList, page, size})
    } else {
         // if (page && size doesnt exist)
        const spots = await Spot.findAll({
            include: [{model: Review}, {model:SpotImage}]
        })
        let spotsList = [];

        spots.forEach(spot => { spotsList.push(spot.toJSON())})

        spotsList.forEach(spot => {
            const reviews = spot.Reviews;
            const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
            const avgRating = totalRating / reviews.length;
            spot.avgRating = avgRating;

            if(spot.SpotImages[0].preview) {
                const previewImg = spot.SpotImages[0].url
                spot.previewImage = previewImg
            } else {
                spot.previewImage = 'Preview is not allowed'
            }
            delete spot.Reviews;
            delete spot.SpotImages;
        })

        res.json({Spots: spotsList})
    }


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

    res.json({Spots: spotsWithAvgRatingAndPreview});
});

//### Get details of a Spot from an id
router.get(`/:spotId`, async (req, res, next) => {
    const id = req.params.spotId
    //find spots where ownerId = current user, also include associated model review and spotimage.
    try {
        let spot = await Spot.findOne({
            include: [
                {model: SpotImage, attributes: { exclude: [`spotId`, `createdAt`, `updatedAt`]}},
                {model:Review}, {model:User}],
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
    const userId = req.user.id;

    try {
        const spot = await Spot.findOne({where: {id}})
        //console.log(spot)
        if(userId !== spot.ownerId) {return res.status(403).json({message: `Forbidden`})};

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
        if(ownerId !== spotSelected.ownerId) {return res.status(403).json({message: `Forbidden`})};
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
        if(ownerId !== spotSelected.ownerId) {return res.status(403).json({message: `Forbidden`})};

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

        res.status(200).json({Reviews: reviews});
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


//### Get all Bookings for a Spot based on the Spot's id
router.get(`/:spotId/bookings`, requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spotSelected = await Spot.findByPk(spotId)

    try {

        if(userId !== spotSelected.ownerId) {
            const bookings = await Booking.findAll({
                where: { spotId },
                attributes: { exclude: [`id`, `userId`, `createdAt`, `updatedAt`] },

            });

            res.status(200).json({Bookings: bookings});
        };

        if (userId === spotSelected.ownerId) {
            const bookings = await Booking.findAll({
                where: { spotId },
                include: [{ model: User, attributes: { exclude: [`username`, `hashedPassword`, `createdAt`, `updatedAt`, `email`] } }],
            });
            res.status(200).json({Bookings: bookings });
        }
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});

//### Create a Booking from a Spot based on the Spot's id
router.post(`/:spotId/bookings`, requireAuth, validateDatesInput,  async (req, res, next) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    const {startDate, endDate} = req.body
    const spotSelected = await Spot.findByPk(spotId)

    //check if the spot exist
    if(!spotSelected) { res.status(404).json({message: `Spot couldn't be found`})}

    //authorization
    if(userId === spotSelected.ownerId) {return res.status(403).json({message: `Forbidden`})};

    //check for booking conflicts.
    const existingBookings = await Booking.findAll({where : {spotId}})
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    for (const existingBooking of existingBookings) {
        const existingStartDate = new Date(existingBooking.startDate);
        const existingEndDate = new Date(existingBooking.endDate);

        if ((selectedStartDate <= existingEndDate && selectedStartDate >= existingStartDate) ||
            (selectedEndDate >= existingStartDate && selectedEndDate <= existingEndDate)){
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            });
        }
    }

    // const conflictingBooking = await Booking.findOne( {
    //     where: {
    //         spotId: spotId,
    //         from: {
    //             $lte: selectedEndDate
    //         },
    //         to: {
    //             $gte: selectedStartDate
    //         }
    //     }
    // })

    // if (conflictingBooking) {
    //     return res.status(403).json({
    //         message: "Sorry, this spot is already booked for the specified dates",
    //         errors: {
    //             "startDate": "Start date conflicts with an existing booking",
    //             "endDate": "End date conflicts with an existing booking"
    //         }
    //     })
    // };

    //if the req.body start and end date passes auth, validatedateinput, the spot exist, authorization, and no booking conflick, then create a new Booking
    const newBooking = await Booking.create({startDate, endDate, spotId, userId})

    return res.json(newBooking)

});


module.exports = router;
