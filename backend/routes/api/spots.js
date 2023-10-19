const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage} = require('../../db/models');
const { AggregateError } = require('sequelize');

const router = express.Router();


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

    res.json({spots: spotsWithAvgRatingAndPreview})
});

module.exports = router;
