const express = require('express');

const sockets = require('./../lib/sockets');
const models = require('./../models');
const getVideos = require('./../lib/videos');

const router = express.Router();

router.post('/', (req, res) => {
  if (req.user && req.body.vid && req.body.type) {
    models.Vote.findOrCreate({
      where: {
        uid: req.user.id,
        vid: req.body.vid,
        type: req.body.type,
      },
    })
      .then(() => {
        getVideos(req)
          .then((videos) => {
            sockets.connection().sendEvent('videoUpdated', { videos });
            res.json({
              success: true,
            });
          });
      });
  } else {
    res.json({
      success: false,
      message: 'must be logged in',
    });
  }
});

router.post('/delete', (req, res) => {
  if (req.user && req.body.vid && req.body.type) {
    models.Vote.destroy({
      where: {
        uid: req.user.id,
        vid: req.body.vid,
        type: req.body.type,
      },
    })
      .then(() => {
        getVideos(req)
          .then((videos) => {
            sockets.connection().sendEvent('videoUpdated', { videos });
            res.json({
              success: true,
            });
          });
      });
  } else {
    res.json({
      success: false,
      message: 'must be logged in',
    });
  }
});

module.exports = router;
