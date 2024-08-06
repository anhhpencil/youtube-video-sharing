const Joi = require('joi');

const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const isYouTubeUrl = (value, helpers) => {
    try {
        const url = new URL(value);
        const validHostnames = ['www.youtube.com', 'youtube.com', 'youtu.be'];
        if (!validHostnames.includes(url.hostname)) {
            return helpers.error('any.invalid');
        }
        return value;
    } catch (err) {
        return helpers.error('any.invalid');
    }
};

const shareVideo = {
  body: Joi.object().keys({
      link: Joi.string().custom(isYouTubeUrl, 'YouTube URL validation').required().messages({
          'any.invalid': 'The URL must be a valid YouTube link',
      }),
  }),
};

const getSharedVideo = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer().default(1),
  }),
};

module.exports = {
  shareVideo,
  getSharedVideo,
};
