const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Users } = require('../models');
const logger = require('../config/logger');

const { authService } = require('../services');

const auth = () => async (req, res, next) => {
  try {
    let apiToken;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      [, apiToken] = authorization.split(' ');
    }

    if (!apiToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not authorized');
    }

    const username = authService.decodeJWTToken(apiToken);

    const user = await Users.findOne({ username });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Your account does not exist');
    }

    req.user = user;
    next();
  } catch (e) {
    logger.error(`Error from auth: ${e}`);
    next(new ApiError(httpStatus.BAD_REQUEST, e.message));
  }
};

module.exports = { auth };
