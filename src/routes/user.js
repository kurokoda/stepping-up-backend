const express    = require('express');
const controller = require('../controllers/user');
const router     = express.Router();

router.post('/api/user/signup', (req, res) => {
  console.log(req.body);
  controller.signup(req, res);
});

router.post('/api/user/login', (req, res) => {
  controller.login(req, res);
});

router.post('/api/user/logout', (req, res) => {
  controller.logout(req, res);
});

module.exports = router;