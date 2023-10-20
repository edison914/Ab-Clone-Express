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
                                                    attributes: [`url`], //how do i display only the url without display the spotImage obj?
                                            }]
                },
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


module.exports = router;
