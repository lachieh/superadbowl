const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({
      success: true,
      msg: 'Logged Out',
    });
  } else {
    res.send({
      success: false,
      msg: 'You must log in first',
    });
  }
});

module.exports = router;
