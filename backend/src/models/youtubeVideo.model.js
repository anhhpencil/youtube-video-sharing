const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;
const youtubeVideoSchema = new Schema(
  {
    email: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

youtubeVideoSchema.index({ email: 1, title: 'text' });

// add plugin that converts mongoose to json
youtubeVideoSchema.plugin(toJSON);
youtubeVideoSchema.plugin(paginate);

module.exports = mongoose.model('YoutubeVideo', youtubeVideoSchema);
