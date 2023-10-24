const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review} = require('../../db/models');
const { ReviewImage, SpotImage } = require (`../../db/models`)
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

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



//### Get all Reviews of the Current User
router.get(`/current`, requireAuth, async (req, res, next) => {

    const userId = req.user.id

    try {
        const reviews = await Review.findAll({
            where: { userId },
            include: [
                {model: User, attributes: { exclude: [`username`, `email`, `hashedPassword`, `createdAt`, `updatedAt`]}},
                {model: Spot, attributes: { exclude: [`description`, `createdAt`, `updatedAt`]},
                                            include: [{
                                                model: SpotImage,
                                                attributes: [`url`]
                }]},
                {model: ReviewImage, attributes: { exclude: [`reviewId`, `createdAt`, `updatedAt`]}},
            ]
        });

        let reviewsList = [];
        reviews.forEach(review => {
            reviewsList.push(review.toJSON())
        })

        reviewsList.forEach(review => {
            //do you want to search for img tht only allow preview and return them?
            review.Spot.previewImage = review.Spot.SpotImages[0].url;

        delete review.Spot.SpotImages;
        })

        res.status(200).json({Reviews: reviewsList});
    } catch (error) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    }
});

//### Add an Image to a Review based on the Review's id
router.post(`/:reviewId/images`, requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const {url} = req.body

    //check if the a review with posted reviewId existed in the db
    const existingReview = await Review.findByPk(reviewId)
    if(!existingReview) {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }

    //check to see if the current review has more than 10
    const imgArr = await ReviewImage.findAll({where: {reviewId}})
    console.log(imgArr)
    if(imgArr.length >= 10) {
        const err = new Error(`Maximum number of images for this resource was reached`);
        err.status = 403;
        return next(err);
    }
    //create the new img for the current reviewId
    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    })

    const safeNewReviewImage = {
        id: newReviewImage.id,
        url: newReviewImage.url
    }
    res.status(200).json(safeNewReviewImage);

})

router.put(`/:reviewId`, requireAuth, validateReviewInput, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const { review, stars } = req.body;
    const reviewSelected = await Review.findByPk(reviewId);

    //check if the reviewSelected exist
    if(!reviewSelected) {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }

    //check Authorization comparing userId from the current user to the review's userId selected.
    if(userId !== reviewSelected.userId) {return res.status(403).json({message: `Forbidden`})};

    reviewSelected.set({
        review,
        stars
    })

    await reviewSelected.save();

    res.status(200).json(reviewSelected);
} )


//### Delete a Review
router.delete(`/:reviewId`, requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id
    const reviewSelected = await Review.findByPk(reviewId);

    //check if the reviewSelected exist
    if(!reviewSelected) {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }

    //check Authorization comparing userId from the current user to the review's userId selected.
    if(userId !== reviewSelected.userId) {return res.status(403).json({message: `Forbidden`})};


    await Review.destroy({where: {id: reviewId}})
    //or await reviewSelected.destroy()

    res.status(200).json({message: `Successfully deleted`})
})

module.exports = router;
