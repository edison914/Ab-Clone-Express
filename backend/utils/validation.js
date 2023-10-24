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
      const err = Error("Bad request");
      err.errors = errors;
      err.status = 400;
      //err.title = "Bad request.";
      //pass on next error middleware if it existed.
      next(err);
    }

    //pass onto next middleware when validation is completed and no error is found.
    next();
  };

  //this is to handle query input in the URL when looking for spots.
  const handleValidationQueryErrors = (req, _res, next) => {

    //find error from the req and assign it to an array called validationErrors
    const validationErrors = validationResult(req);

    //extract page and size from URL query
    const { page, size } = req.query
    //loop through the validationErrors array if its not empty
    //AND page is not undefined AND size is not undefined
    if (!validationErrors.isEmpty() && page !== undefined && size !== undefined) {
      const errors = {};
      validationErrors
        .array()

        .forEach(error => errors[error.path] = error.msg);
      const err = Error("Bad request");
      err.errors = errors;
      err.status = 400;
      //err.title = "Bad request.";
      //pass on next error middleware if it existed.
      next(err);
    }

    //pass onto next middleware when validation is completed and no error is found.
    next();
  };

  module.exports = {
    handleValidationErrors, handleValidationQueryErrors
  };
