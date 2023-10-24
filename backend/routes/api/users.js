const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

////import check function from exrpess-validator lib.
const { check } = require('express-validator');
//import handlevaidationErros middleware from util.
const { handleValidationErrors } = require('../../utils/validation');

//create a signup validator
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
    // check('username')
    //     .not()
    //     .isEmail(),
     //   .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Last Name is required'),
    // check('password')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 6 }),
    //    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


//create a new user, signup
router.post(`/`, validateSignup, async (req, res, next) => {
    const {password, email, firstName, lastName, username} = req.body;

    //create a hashed password
    const hashedPassword = bcrypt.hashSync(password)
    //create a new user with info from the body
    const newUser = await User.create({ email, firstName, lastName, username, hashedPassword});
    //create a safeuser obj with the info in obj without the password
    const safeUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username
    };

    //create and set a JWToken with newUser on broswer's cookies so the new user can access the database.
    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
})

//testing users route
router.get(`/`, async (req, res, next) => {

    const AllUsers = await User.findAll()


    return res.json(
        {Users: AllUsers}
    );
})

module.exports = router;
