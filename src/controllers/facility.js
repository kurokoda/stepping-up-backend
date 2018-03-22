const RESPONSE = require('../constants/response');
const Facility = require('../schema/facility');
const logging  = require('../service/logging');
const doLog    = false;

// seed -------------------------------------------------------------------

module.exports.seed = () => {
  const facilities = [
    {
      facilityID: '100',
      name      : 'Florence State Prison',
      address   : '1305 E Butte Ave',
      city      : 'Florence',
      state     : 'AZ',
      zip       : '85132',
    },
    {
      facilityID: '101',
      name      : 'Phoenix State Prison',
      address   : '2500 E Van Buren St',
      city      : 'Phoenix',
      state     : 'AZ',
      zip       : '85008',
    },
    {
      facilityID: '102',
      name      : 'Tuscon State Prison',
      address   : '10000 South Wilmot',
      city      : 'Tuscon',
      state     : 'AZ',
      zip       : '85734',
    },
  ];

  Facility.remove({}, () => {
    for (let i = 0; i < facilities.length; i++) {
      const data         = facilities[i];
      const facilityData = {
        facilityID: data.facilityID,
        name      : data.name,
        address   : data.address,
        city      : data.city,
        state     : data.state,
        zip       : data.zip,
      };
      Facility.create(facilityData, (error, facility) => {
        if (error) {
          doLog && console.log('create error', error.errmsg);
        } else {
          // doLog && console.log('Facility created!', facility);
        }
      });
    }
  })
  .catch(error => {
    doLog && console.log(error);
  });
};

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
      doLog && console.log(`create facility result: ${facility}`);
      if (error) {
        logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
        res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
      } else {
        logging.logUserAction({action, userID, ip: req.ip});
        res.status(200).send();
      }
    })
  } else {
    const code = 403;
    logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
  }
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action = 'get_facilities';
  const userID = req.session.user._id;
  Facility.find({}, (error, facilities) => {
    doLog && console.log(`get facilities result: ${facilities}`);
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
    doLog && console.log(`get facility result: ${facility}`);
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
    doLog && console.log(`delete facility result: ${facility}`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: targetFacility, ip: req.ip});
      res.status(200).send();
    }
  })
};
