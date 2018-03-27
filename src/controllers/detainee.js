const RESPONSE    = require('../constants/response');
const Detainee    = require('../schema/detainee');
const DetaineePHI = require('../schema/detaineePHI');
const logging     = require('../service/logging');

// seed -------------------------------------------------------------------

module.exports.seed = () => {
  const url         = 'https://randomuser.me/api/?results=50&nat=us';
  const facilityIDs = ['100', '101', '102'];
  const fetch       = require('node-fetch');
  fetch(url)
  .then(response => {
    response.json()
    .then(json => {
      Detainee.remove({}, () => {
        DetaineePHI.remove({}, () => {
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
              const detaineePHIData = {
                _id   : detainee.id,
                gender: data.gender,
              };
              DetaineePHI.create(detaineePHIData, function (error, detainee) {
                if (error) {
                } else {
                }
                ;
              })
            });
          }
        });
      });
    });
  })
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action = 'get_detainees';
  Detainee.find({}, (error, detainees) => {
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
      if (error) {
        logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
        res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
      } else {
        const detaineePHIData = {
          gender: data.gender,
          pii   : detainee.id,
        };
        DetaineePHI.create(detaineePHIData, function (error, detainee) {
          if (error) {
            logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
            res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
          } else {
            logging.logUserAction({action, userID, ip: req.ip});
            res.status(200).send();
          }
        })
      }
    })
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
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, detaineeID, ip: req.ip});
      res.status(200).send();
    }
  })
}
