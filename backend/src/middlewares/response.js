const logger = require('../config/logger');

const responseHandler = (req, res, next) => {
  const { json } = res;
  res.json = function (obj) {
    let formatedResponse;
    try {
      formatedResponse = JSON.parse(JSON.stringify(obj));
    } catch (err) {
      logger.error(err);
    }
    // do not format response of error
    if (formatedResponse.hasError === undefined) {
      formatedResponse = {
        hasError: false,
        statusCode: 200,
        message: 'Successful',
        data: formatedResponse,
      };
    }
    json.call(this, formatedResponse);
  };
  next();
};

module.exports = {
  responseHandler,
};
