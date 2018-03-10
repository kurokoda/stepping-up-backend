const express    = require('express');
const route      = '/api/facility/';
const controller = require('../controllers/facility');
const router = express.Router();


router.get(route, (req, res) => {
  controller.all(req, res);
});

router.post(route, (req, res) => {
  controller.post(req, res);
});

router.get(`${route}:id`, (req, res) => {
  controller.get(req, res);
});

router.patch(`${route}:id`, (req, res) => {
  controller.patch(req, res);
});

router.delete(`${route}:id`, (req, res) => {
  controller.delete(req, res);
});

module.exports = router;