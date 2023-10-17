//extract validationResult method from express-validator library
const { validationResult} = require (`express-validator`);

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {

    //find error from the req and assign it to an array called validationErrors
    const validationErrors = validationResult(req);

    //loop through the validationErrors array if its not empty.
    if (!validationErrors.isEmpty()) {
      const errors = {};
      validationErrors
        .array()
        .forEach(error => errors[error.path] = error.msg);

      const err = Error("Bad request.");
      err.errors = errors;
      err.status = 400;
      err.title = "Bad request.";
      //pass on next error middleware if it existed.
      next(err);
    }

    //pass onto next middleware when validation is completed and no error is found.
    next();
  };

  module.exports = {
    handleValidationErrors
  };
