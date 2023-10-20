// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign( //create a token using payload, password and options
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };

//restoreUser middleware, taking in req, res, and next
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next(); //dont throw an err because the user can be logout, pass in another middleware to login if needed
    }

    try {
      const { id } = jwtPayload.data; //jwtPayload was safeUser.id
          req.user = await User.findByPk(id, { //req.user is coming from the req called, safeuser from session.js, login on 62.
              attributes: {
              include: ['email', 'createdAt', 'updatedAt']
          }
      });
    } catch (e) {
          res.clearCookie('token');
          return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

//check if auth is required
const requireAuth = function (req, _res, next) {
    if (req.user) return next(); //not really following req.user

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    //err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth };
