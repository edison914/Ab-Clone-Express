const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//create a new user, signup
router.post(`/`, async (req, res, next) => {
    const {password, email, username} = req.body;

    //create a hashed password
    const hashedPassword = bcrypt.hashSync(password)
    //create a new user with info from the body
    const newUser = await User.create({ email, username, hashedPassword});

    //create a safeuser obj with the info in obj without the password
    const safeUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
    };

    //create and set a JWToken with newUser on broswer's cookies so the new user can access the database. //login
    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
})

module.exports = router;
