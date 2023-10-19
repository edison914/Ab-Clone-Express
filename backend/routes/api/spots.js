const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();


router.get(`/`, async (req, res, next) => {
    const spots = await Spot.findAll()
    const avgRating = 2 ;
    const spotImgUrl = `222`;
    res.json({spots: spots})
});

module.exports = router;
