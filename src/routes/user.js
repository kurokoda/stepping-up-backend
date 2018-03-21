const express    = require('express');
const controller = require('../controllers/user');
const route      = '/api/user/';
const router     = express.Router();

// auth:login -------------------------------------------------------------------

router.post('/api/user/login', (req, res) => {
  controller.login(req, res);
});

// auth:logout -------------------------------------------------------------------

router.post('/api/user/logout', (req, res) => {
  controller.logout(req, res);
});

// create -------------------------------------------------------------------

router.post('/api/user/signup', (req, res) => {
  console.log('signup')
  controller.signup(req, res);
});

// read all -------------------------------------------------------------------

router.get(route, (req, res) => {
  controller.all(req, res);
});

// read -------------------------------------------------------------------

router.get(`${route}:id`, (req, res) => {
  controller.get(req, res);
});

// delete -------------------------------------------------------------------

router.delete(`${route}:id`, (req, res) => {
  controller.delete(req, res);
});

// exports -------------------------------------------------------------------

module.exports = router;
