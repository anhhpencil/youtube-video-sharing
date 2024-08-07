const { Router } = require('express');

const { youtubeVideoController } = require('../controllers');
const validate = require('../middlewares/validate');
const { youtubeVideoValidation } = require('../validations');
const { auth } = require('../middlewares/auth');

const route = Router();

route.get('/', validate(youtubeVideoValidation.getSharedVideo), youtubeVideoController.getsharedVideo);
route.post('/', auth(), validate(youtubeVideoValidation.shareVideo), youtubeVideoController.shareVideo);

module.exports = route;
