const RESPONSE = require('../constants/response');
const logging  = require('../service/logging');
const auth     = require('../service/auth');
const User     = require('../schema/user');

// auth:login -------------------------------------------------------------------

module.exports.login = (req, res) => {
  console.log('login', req.body.email, req.body.password);

  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      const error  = new Error('Wrong email or password.');
      error.status = 401;
      res.status(401).send(error);
    } else {
      console.log('login success', user);
      req.session.user = user;
      res.status(200).send(user);
    }
  });
};

// auth:logout -------------------------------------------------------------------

module.exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(function (error) {
      if (error) {
        res.status(500).send({express: 'logout error', params: req.body});
      } else {
        res.status(200).send({express: 'logout successful', params: req.body});
      }
    });
  } else {
    res.status(200).send({express: 'logout successful', params: req.body});
  }
};

// auth:signup -------------------------------------------------------------------

module.exports.signup = (req, res) => {
  const action = 'signup_user';
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.facilityID
  ) {
    const userData = {
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      email     : req.body.email,
      username  : req.body.username,
      password  : req.body.password,
      facilityID: req.body.facilityID,
      userID    : auth.generateID(6),
    };
    User.create(userData, function (error) {
      if (error) {
        console.log('User create error', error);
        res.status(403).send(error);
      } else {
        console.log('User create success');
        User.findOne({email: userData.email}, function (error, user) {
          if (error) {
            res.status(404).send(error);
          } else {
            const userID = user._id;
            logging.logUserAction({action, userID, ip: req.ip});
            res.status(200).send();
          }
        })
      }
    })
  } else {
    const code = 403;
    logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
  }
};

// create

module.exports.post = (req, res) => {
  const action = 'create_user';
  const userID = req.session.user._id;
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.facilityID
  ) {
    const userData = {
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      email     : req.body.email,
      username  : req.body.username,
      password  : req.body.password,
      facilityID: req.body.facilityID,
      userID    : req.body.userID,
    };
    User.create(userData, function (error, user) {

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

// retrieve -------------------------------------------------------------------

module.exports.get = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action       = 'get_user';
  const facilityID   = req.session.user.facilityID;
  const userID       = req.session.user._id;
  const targetUserID = req.params.id;
  User.findOne({
    facilityID,
    userID: targetUserID,
  }, (error, user) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: req.params.id, ip: req.ip});
      res.status(200).send(user);
    }
  })
};

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------

module.exports.delete = (req, res) => {
  if (!req.session.user) return res.status(401).send(RESPONSE.NOT_AUTHORIZED_401());
  const action       = 'delete_user';
  const facilityID   = req.session.user.facilityID;
  const userID       = req.session.user._id;
  const targetUserID = req.params.id;
  User.findOneAndRemove({
    facilityID,
    userID: targetUserID,
  }, (error, user) => {

    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: req.params.id, ip: req.ip});
      res.status(200).send(user);
    }
  })
};

// validate -------------------------------------------------------------------

module.exports.synchronizeUserSession = (req, res) => {
  const doesRequestUserMatchSessionUser = (req.session.user ? req.session.user.userID === req.params.id : false);
  if (doesRequestUserMatchSessionUser) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};
