const express = require('express');
const getVideos = require('./../lib/videos');

const router = express.Router();

router.get('/', (req, res) => {
  getVideos(req)
    .then(videos => res.json({ videos }));
});

module.exports = router;
