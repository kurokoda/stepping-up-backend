const controller = require('../controllers/question');
const express    = require('express');
const route      = '/api/question/';
const router     = express.Router();

// create -------------------------------------------------------------------

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

// update -------------------------------------------------------------------

router.patch(`${route}:id`, (req, res) => {
  controller.patch(req, res);
});

// delete -------------------------------------------------------------------

router.delete(`${route}:id`, (req, res) => {
  controller.delete(req, res);
});

// exports -------------------------------------------------------------------

module.exports = router;
