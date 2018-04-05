const RESPONSE = require('../constants/response');
const Facility = require('../schema/facility');
const logging  = require('../service/logging');
const User     = require('../schema/user');
const Detainee = require('../schema/detainee');

// create -------------------------------------------------------------------

module.exports.post = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  }
  const action = 'create_facility';
  const userID = req.session.user._id;
  if (
    req.body.facilityID &&
    req.body.name &&
    req.body.address &&
    req.body.city &&
    req.body.state &&
    req.body.zip
  ) {
    const facilityData = {
      facilityID: req.body.facilityID,
      name      : req.body.name,
      address   : req.body.address,
      city      : req.body.city,
      state     : req.body.state,
      zip       : req.body.zip,
    };
    Facility.create(facilityData, function (error, facility) {
      if (error) {
        logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
        res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
      } else {
        logging.logUserAction({action, userID, ip: req.ip});
        res.status(200).send();
      }
    })
  }
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action = 'get_facilities';
  const userID = req.session.user._id;
  Facility.find({}, (error, facilities) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, ip: req.ip});
      res.status(200).send(facilities);
    }
  })
};

// read -------------------------------------------------------------------

module.exports.get = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action         = 'get_facility';
  const userID         = req.session.user._id;
  const userFacility   = req.session.user.facilityID;
  const targetFacility = req.params.id;
  Facility.findOne({
    facilityID: userFacility,
    facilityID: targetFacility,
  }, (error, facility) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: targetFacility, ip: req.ip});
      res.status(200).send(facility);
    }
  })
};

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------

module.exports.delete = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action         = 'delete_facility';
  const userID         = req.session.user._id;
  const userFacility   = req.session.user.facilityID;
  const targetFacility = req.params.id;
  Facility.findOneAndRemove({
    facilityID: userFacility,
    facilityID: targetFacility,
  }, (error, facility) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: targetFacility, ip: req.ip});
      res.status(200).send();
    }
  })
};

// retrieve all facility users -------------------------------------------------------------------

module.exports.getFacilityUsers = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'get_facility_users';
  const facilityID = req.session.user.facilityID;
  Facility.findOne({
    facilityID
  }, (error, facility) => {
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID: req.session.user._id, ip: req.ip});
      const {ordinal, count} = req.query;
      const users            = facility.users.slice((ordinal * count) - count, ordinal * count);
      const usersTotal       = facility.users.length;
      res.status(200).send({users, usersTotal});
    }
  })
};


// retrieve all facility admins -------------------------------------------------------------------

module.exports.getFacilityAdmins = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'get_facility_admins';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  User.find({
    facilityID,
    admin: true,
  }, (error, admins) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, ip: req.ip});
      res.status(200).send(admins);
    }
  })
};

// retrieve all facility counselors -------------------------------------------------------------------

module.exports.getFacilityCounselors = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'get_facility_counselors';
  const facilityID = req.session.user.facilityID;
  Facility.findOne({
    facilityID
  }, (error, facility) => {
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID: req.session.user._id, ip: req.ip});
      const {ordinal, count} = req.query;
      const counselors       = facility.counselors.slice((ordinal * count) - count, ordinal * count);
      const counselorsTotal  = facility.counselors.length;
      res.status(200).send({counselors, counselorsTotal});
    }
  })
};

// read all -------------------------------------------------------------------

module.exports.getFacilityDetainees = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'get_facility_detainees';
  const facilityID = req.session.user.facilityID;
  Facility.findOne({
    facilityID
  }, (error, facility) => {
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID: req.session.user._id, ip: req.ip});
      const {ordinal, count} = req.query;
      const detainees        = facility.detainees.slice((ordinal * count) - count, ordinal * count);
      const detaineesTotal   = facility.detainees.length;
      res.status(200).send({detainees, detaineesTotal});
    }
  })
};
