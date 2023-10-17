const express = require (`express`);
const { Op } = require (`sequelize`);
const bcrypt = require (`bcryptjs`);

const { setTokenCookie, restoreUsers } = require (`../../utils/auth`);
const { User } = require(`../../db/models`);

const router = express.Router();

//login with post method, body should be an obj
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    //find one user that either username or email equal to credential from req.body. and create a user obj.
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

module.exports = router;
