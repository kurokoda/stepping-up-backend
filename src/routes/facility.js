const controller = require('../controllers/facility');
const express    = require('express');
const route      = '/api/facility/';
const router     = express.Router();

// create -------------------------------------------------------------------

router.post(route, (req, res) => {
  controller.post(req, res);
});

// read all -------------------------------------------------------------------

router.get(route, (req, res) => {
  controller.all(req, res);
});

// read all -------------------------------------------------------------------

router.get(`${route}users`, (req, res) => {
  controller.getFacilityUsers(req, res);
});

// read all -------------------------------------------------------------------

router.get(`${route}admins`, (req, res) => {
  controller.getFacilityAdmins(req, res);
});

// read all -------------------------------------------------------------------

router.get(`${route}counselors`, (req, res) => {
  controller.getFacilityCounselors(req, res);
});

// read all -------------------------------------------------------------------

router.get(`${route}detainees`, (req, res) => {
  controller.getFacilityDetainees(req, res);
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
