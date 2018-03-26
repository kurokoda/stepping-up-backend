const express    = require('express');
const controller = require('../controllers/user');
const route      = '/api/user/';
const router     = express.Router();

// auth:login -------------------------------------------------------------------

router.post(`/api/user/login`, (req, res) => {
  controller.login(req, res);
});

// auth:logout -------------------------------------------------------------------

router.get(`/api/user/logout`, (req, res) => {
  console.log('HERE I AM');
  controller.logout(req, res);
});

// signup -------------------------------------------------------------------

router.post(`/api/user/signup`, (req, res) => {
  controller.signup(req, res);
});

// signup -------------------------------------------------------------------

router.post(route, (req, res) => {
  controller.post(req, res);
});

// read -------------------------------------------------------------------

router.get(`/api/user/:id`, (req, res) => {
  controller.get(req, res);
});

// delete -------------------------------------------------------------------

router.delete(`/api/user/:id`, (req, res) => {
  controller.delete(req, res);
});

// delete -------------------------------------------------------------------

router.get(`/api/user/session/validate/:id`, (req, res) => {
  controller.synchronizeUserSession(req, res);
});

// exports -------------------------------------------------------------------

module.exports = router;
