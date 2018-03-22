const RESPONSE = require('../constants/response');
const Detainee = require('../schema/detainee');
const logging  = require('../service/logging');
const doLog    = true;

// seed -------------------------------------------------------------------

module.exports.seed = () => {
  const url         = 'https://randomuser.me/api/?results=50&nat=us';
  const facilityIDs = ['100', '101', '102'];
  const fetch       = require('node-fetch');

  fetch(url)
  .then(response => {
    response.json().then(json => {
      Detainee.remove({}, () => {
        for (let i = 0; i < json.results.length; i++) {
          const index        = Math.floor(Math.random() * 3);
          const detaineeID   = Math.ceil(Math.random() * 1000000);
          const data         = json.results[i];
          const detaineeData = {
            facilityID: facilityIDs[index],
            detaineeID: detaineeID,
            gender    : data.gender,
            firstName : data.name.first,
            lastName  : data.name.last,
          };
          Detainee.create(detaineeData, (error, detainee) => {
            if (error) {
              console.log('Error creating detainee', error);
            } else {
              // console.log(detainee);
            }
          });
        }
      });
    });
  })
  .catch(error => {
    console.log(error);
  });
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action         = 'get_detainees';
  const userFacilityID = req.session.user.facilityID;
  Detainee.find({
    facilityID: userFacilityID
  }, (error, detainees) => {
    console.log(detainees);
    doLog && console.log(`get detainees result: ${detainees}`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID: req.session.user._id, ip: req.ip});
      res.status(200).send(detainees);
    }
  })
};

// read -------------------------------------------------------------------

module.exports.get = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'get_detainee';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  const detaineeID = req.params.id;
  Detainee.findOne({
    facilityID,
    detaineeID,
  }, (error, detainee) => {
    doLog && console.log(`get detainee result: ${detainee} (if value is null there may be no user with this id at the requestor's facility)`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, ip: req.ip});
      res.status(200).send(detainee);
    }
  })
};

// create -------------------------------------------------------------------

module.exports.post = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action = 'create_detainee';
  const userID = req.session.user._id;
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.detaineeID &&
    req.body.gender &&
    req.body.facilityID
  ) {
    const detaineeData = {
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      detaineeID: req.body.detaineeID,
      gender    : req.body.gender,
      facilityID: req.body.facilityID,
    };
    Detainee.create(detaineeData, function (error, detainee) {
      doLog && console.log(`create detainee result: ${detainee}`);
      if (error) {
        logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
        res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
      } else {
        logging.logUserAction({action, userID, ip: req.ip});
        res.status(200).send();
      }
    })
  } else {
    logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
  }
};

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------

module.exports.delete = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action     = 'create_detainee';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  const detaineeID = req.params.id;
  Detainee.findOneAndRemove({
    facilityID,
    detaineeID,
  }, (error, detainee) => {
    console.log(detainee._ct);
    doLog && console.log(`delete detainee result: ${detainee} (if value is null there may be no user with this id at the requestor's facility)`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, detaineeID, ip: req.ip});
      res.status(200).send();
    }
  })
}
