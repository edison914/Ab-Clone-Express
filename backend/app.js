const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const { ValidationError } = require('sequelize');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(routes); // Connect all the routes, this is to use all routes in index.js in the routes folder.

  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404; //status of a value. its not related to res.
    next(err);
  });

  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        //console.log(error)
        if(error.message = "email must be unique") {
          error.message = "User with that email already exists"
          err.message = "User already exists"
        }
        if(error.message = "user must be unique") {
          error.message = "User with that username already exists"
          err.message = "User already exists"
        }
        errors[error.path] = error.message;

      }
      //err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });


  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
      //title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      //stack: isProduction ? null : err.stack
    });
  });

  module.exports = app;
