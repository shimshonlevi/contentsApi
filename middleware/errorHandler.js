const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stack: err.stack, // מפריד את ה-stack מהסטטוס
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stack: err.stack,
      });
      break;

    default:
      console.log("no erroe");
      
      break;
  }
};

module.exports = errorHandler;
