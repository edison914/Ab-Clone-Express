const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require (`sequelize`);

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review} = require('../../db/models');
const { ReviewImage, SpotImage, Booking } = require (`../../db/models`)
const { AggregateError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

const router = express.Router()

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


//### Edit a Booking
router.put(`/:bookingId`, requireAuth, validateDatesInput,  async (req, res, next) => {
    console.log(`is this called`)
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const {startDate, endDate} = req.body

    const bookingSelected = await Booking.findByPk(bookingId)
    const spotId = bookingSelected.spotId

    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    //check to see if the booking is found
    if(!bookingSelected) {res.status(404).json({message: `Booking couldn't be found`})}

    //check if the current booking belongs to current user
    if(bookingSelected.userId !== userId) {res.status(403).json({message: `Forbidden`})}

    //check to see if the selected booking. StartDate is in the past
    const today = new Date();
    const bookingSelectedStartDate = new Date(bookingSelected.startDate)
    if (bookingSelectedStartDate < today) {res.status(403).json({message: `Past bookings can't be modified`})}

    //checking for booking conflict
    const existingBookings = await Booking.findAll({where : {spotId}})

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

    //set new Booking Date
    bookingSelected.set({
        startDate,
        endDate
    });
    await bookingSelected.save()
    res.status(200).json(bookingSelected);

});

module.exports = router;
