const RESPONSE = require('../constants/response');
const Facility = require('../schema/facility');
const logging  = require('../service/logging');

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
          console.log('Error creating facility', error);
        } else {
          // console.log('Facility created!', facility);
        }
      });
    }
  })
  .catch(error => {
    console.log(error);
  });
};

// create -------------------------------------------------------------------

module.exports.post = (req, res) => {
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
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
      lastName  : req.body.lastName,
      address   : req.body.address,
      city      : req.body.city,
      state     : req.body.state,
      zip       : req.body.zip,
    };
    Facility.create(facilityData, function (error) {
      if (error) {
        res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
      } else {
        logging.logUserAction({action, userID});
        res.status(200).send();
      }
    })
  } else {
    const code = 403;
    const date = new Date();
    logging.logApiError({action, code, date, error: {msg: 'required data not provided'}});
    console.log(error);
  }
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
  if (!req.session.user.isRoot) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403());
  const action = 'get_facilities';
  const userID = req.session.user._id;
  Facility.find({}, (error, facilities) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404());
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(RESPONSE.SUCCESS_200(facilities));
    }
  })
};

// read -------------------------------------------------------------------

module.exports.get = (req, res) => {
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
  const action     = 'get_facility';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  Facility.findOne({facilityID}, (error, facility) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404);
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(facility);
    }
  })
};

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------


module.exports.delete = (req, res) => {
  if (!req.session.user.isRoot) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403());
  const action     = 'delete_facility';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  Facility.remove({facilityID}, (error, facility) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404());
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(RESPONSE.SUCCESS_200(facility));
    }
  })
};
