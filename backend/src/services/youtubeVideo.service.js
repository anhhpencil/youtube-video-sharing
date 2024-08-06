const ytdl = require('ytdl-core');
const ApiError = require('../utils/ApiError');
const { STATUS_CODE } = require('../config/internal-code');

const { YoutubeVideo } = require('../models');

const shareVideo = async (email, link, socketIO) => {
  const isExisted = await YoutubeVideo.findOne({ email, link });
  if (isExisted) {
    throw new ApiError(STATUS_CODE.EXISTED_VALUE, 'The video has been shared.');
  }

  const videoInfo = await ytdl.getInfo(link);

  const { title, description } = videoInfo.videoDetails;

  await YoutubeVideo.create({
    email,
    link,
    description,
    title,
  });

  socketIO.emit(
    'newVideo',
    JSON.stringify({
      title,
      email,
    })
  );
  return {};
};

const getSharedVideo = async (filter, options) => {
  const videos = await YoutubeVideo.paginate(filter, options);

  const { results, totalPages, totalResults } = videos;
  const formatResult = results.map((item) => {
    return {
      email: item.email,
      link: item.link,
      title: item.title,
      description: item.description,
      createdAt: item.createdAt,
    };
  });

  return { totalShared: totalResults, videos: formatResult, totalPages };
};

module.exports = {
  shareVideo,
  getSharedVideo,
};
