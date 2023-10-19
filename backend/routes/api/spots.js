const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage} = require('../../db/models');
const { AggregateError } = require('sequelize');

const router = express.Router();

//### Get all Spots - done
router.get(`/`, async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [{model: Review}, {model:SpotImage}]
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
router.get(`/:spotId`, requireAuth, async (req, res, next) => {
    const id = req.params.spotId
    //find spots where ownerId = current user, also include associated model review and spotimage.
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
    console.log(filteredOwner)

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
});

module.exports = router;
