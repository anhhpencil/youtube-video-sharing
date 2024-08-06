const catchAsync = require('../utils/catchAsync');
const { youtubeVideoService } = require('../services');

/**
 * Share a youtube video
 * @param {*} req
 * @param {*} res
 * @returns
 */
const shareVideo = catchAsync(async (req, res) => {
  const { email } = req.user;
  const socketIO = req.io;

  const { link } = req.body;

  await youtubeVideoService.shareVideo(email, link, socketIO);

  res.send({});
});

/**
 * Get recent shared video youtube video
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getsharedVideo = catchAsync(async (req, res) => {
  const { limit, page } = req.query;

  const filter = {};
  const options = {
    sortBy: 'createdAt:desc', // sort order
    limit: Math.min(50, limit), // maximum results per page
    page, // page number
  };

  const data = await youtubeVideoService.getSharedVideo(filter, options);

  res.send(data);
});

module.exports = {
  shareVideo,
  getsharedVideo,
};
