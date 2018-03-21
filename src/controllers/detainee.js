const RESPONSE = require('../constants/response');
const Detainee = require('../schema/detainee');
const logging  = require('../service/logging');

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
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
  const action     = 'get_detainees';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  Detainee.find({facilityID}, (error, detainees) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404);
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(detainees);
    }
  })
};

// read -------------------------------------------------------------------

module.exports.get = (req, res) => {
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
  const action     = 'get_detainee';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  const detaineeID = req.body.detineeID;
  Detainee.findOne({facilityID, detaineeID}, (error, detainee) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404);
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(detainee);
    }
  })
};

// create -------------------------------------------------------------------

module.exports.post = (req, res) => {
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
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
    Detainee.create(detaineeData, function (error) {
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

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------

module.exports.delete = (req, res) => {
  if (!req.session.user) return res.status(403).send(RESPONSE.NOT_AUTHORIZED_403);
  const action     = 'delete_detainee';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  const detaineeID = req.body.detineeID;
  Detainee.remove({facilityID, detaineeID}, (error, detainee) => {
    if (error) {
      res.status(404).send(RESPONSE.NOT_FOUND_404);
    } else {
      logging.logUserAction({action, userID});
      res.status(200).send(detainee);
    }
  })
};
