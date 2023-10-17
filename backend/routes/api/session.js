const express = require (`express`);
const { Op } = require (`sequelize`);
const bcrypt = require (`bcryptjs`);

const { setTokenCookie, restoreUsers } = require (`../../utils/auth`);
const { User } = require(`../../db/models`);

const router = express.Router();

//import check function from exrpess-validator lib.
const { check } = require('express-validator');
//import handlevaidationErros middleware from util.
const { handleValidationErrors } = require('../../utils/validation');

//perform validation on req body using express-validator
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    //call handleValidationError middleware from util to see wether to go next or next(error)
    handleValidationErrors
  ];


//login with post method, body should be an obj, validateLogin is checked first before checking to see if there is user exist in database.
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    //find one user that either username or email matches credential from req.body. and create a user obj.
    const user = await User.unscoped().findOne({ //unscoped method is to include all atrributes from the User database. ignore defaultScope and exclude.
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    //if user is not found or entered password doesnt match after hashing, create a Error, pass to the error to next middleware
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    //otherwise, create a safeuser obj, with id, email and username from the verified user obj.
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

    //create and set a Token cookie for the user that is stored in the browser. //login
    await setTokenCookie (res, safeUser);

    //return a response with user info to confirm login successfully.
    return res.json({user: safeUser});

})

//remove jwtoken stored in browser or log out.
router.delete(`/`, (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
})

//Get session user API, /API/session
//route call order.
    //app.js, line 45, app.use(routes)
    //routes/api/index, line 17, router.use('/api', apiRouter)
    //routes/api/session, line 59, router below is called.
router.get(`/`, async (req, res) => {
    const { user } = req;

    // if user exist, send res with user info else send null.
    if(user) {
        //create a safeuser obj to exclude password
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        return res.json({user: safeUser});
    } else {
        return res.json({user: null});
    }
})




module.exports = router;
