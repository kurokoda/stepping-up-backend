const express    = require('express');
const controller = require('../controllers/user');
const route      = '/api/user/';
const router     = express.Router();

// auth:login -------------------------------------------------------------------

router.post(`${route}login`, (req, res) => {
  controller.login(req, res);
});

// auth:logout -------------------------------------------------------------------

router.post(`${route}logout`, (req, res) => {
  controller.logout(req, res);
});

// signup -------------------------------------------------------------------

router.post(`${route}signup`, (req, res) => {
  controller.signup(req, res);
});

// signup -------------------------------------------------------------------

router.post(route, (req, res) => {
  controller.post(req, res);
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
