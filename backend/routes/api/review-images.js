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

//### Delete a review Image
router.delete(`/:imageId`, requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const imageSelected = await ReviewImage.findByPk(imageId);

    //check to see if the spot with the image exist
     if(!imageSelected) {res.status(404).json({message: `Review Image couldn't be found`})}
     const reviewId = imageSelected.reviewId

    //check if image selected belongs to current user
    const reviewSelected = await Review.findByPk(reviewId);
    if (reviewSelected.userId !== userId) {
        res.status(403).json({message: `Forbidden`}
        )
    }

    await imageSelected.destroy();

    res.status(200).json({message: `Successfully deleted`});
});

module.exports = router;
