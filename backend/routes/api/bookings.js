const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review} = require('../../db/models');
const { ReviewImage, SpotImage, Booking } = require (`../../db/models`)
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validateBookingInput = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Review text is required'),
    check('stars')
      .isInt({ min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


//### Get all of the Current User's Bookings
router.get(`/current`, requireAuth, async (req, res, next) => {

    const userId = req.user.id;

    try {
        const bookings = await Booking.findAll({
            where: { userId },
            attributes: { exclude: [`userId`, `startDate`, `endDate`, `createdAt`, `updatedAt`] },
            include: [
                {model: Spot, attributes: { exclude: [`description`, `createdAt`, `updatedAt`]},
                                            include: [{
                                                    model: SpotImage,
                                                    attributes: [`url`], //how do i display only the url without display the spotImage obj?
                                            }]
                },
                {model: User, attributes: { exclude: [`username`, `email`, `hashedPassword`]}},
            ]
        });

        res.status(200).json({bookings});
    } catch (error) {
        const err = new Error(`Booking couldn't be found`);
        err.status = 404;
        return next(err);
    }
});


module.exports = router;
