const express = require('express');
const userRoute = require('./user.route');

const youtubeVideoRoute = require('./youtubeVideo.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/share-video',
    route: youtubeVideoRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
