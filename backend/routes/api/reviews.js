const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review} = require('../../db/models');
const { ReviewImage } = require (`../../db/models`)
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

router.get(`/current`, requireAuth, async (req, res, next) => {

    const userId = req.user.id

    const testResult = await ReviewImage.findAll(
        //include: [{model: Review}]
     )
    // console.log(`is this called1`)
     console.log(testResult)

    // const currentReview = await Review.findOne({ where: {userId}})
    // console.log(currentReview)
    // const reviewImg = await currentReview.getReviewImage()
    // console.log(reviewImg)
    // try {

        const reviews = await Review.findAll({
            where: { userId }, // Adjust this to match your database schema.
            include: [
                //{model: Spot},
                //{model: ReviewImage},
                {model: User}
            ]
        });

        res.status(200).json({reviews});
    // } catch (error) {
    //     const err = new Error(`Spot couldn't be found`);
    //     err.status = 404;
    //     return next(err);
    // }
});

module.exports = router;
