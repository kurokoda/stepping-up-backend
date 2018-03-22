const RESPONSE = require('../constants/response');
const User     = require('../schema/user');
const logging  = require('../service/logging');
const sid      = require('shortid');
const doLog    = false;

// seed -------------------------------------------------------------------

module.exports.seed = () => {
  const users = [
    {
      firstName : 'Norman',
      lastName  : 'Snyder',
      email     : 'userone@gmail.com',
      username  : 'normanSnyder',
      password  : 'password',
      facilityID: '100',
      userID    : sid.generate(),
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'Bertha',
      lastName  : 'Martinez',
      email     : 'usertwo@gmail.com',
      username  : 'berthaMartinez',
      password  : 'password',
      facilityID: '100',
      userID    : sid.generate(),
      admin     : null,
      counselor : true,
    },
    {
      firstName : 'Bella',
      lastName  : 'Bailey',
      email     : 'userthree@gmail.com',
      username  : 'bellaBailey',
      password  : 'password',
      facilityID: '100',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Dan',
      lastName  : 'Lawson',
      email     : 'userfive@gmail.com',
      username  : 'danLawson',
      password  : 'password',
      facilityID: '100',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Irma',
      lastName  : 'Williams',
      email     : 'usersix@gmail.com',
      username  : 'irmaWilliams',
      password  : 'password',
      facilityID: '101',
      userID    : sid.generate(),
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'Armando',
      lastName  : 'Harper',
      email     : 'userseven@gmail.com',
      username  : 'armandoHarper',
      password  : 'password',
      facilityID: '101',
      userID    : sid.generate(),
      admin     : null,
      counselor : true,
    },
    {
      firstName : 'Jacob',
      lastName  : 'Adams',
      email     : 'usereight@gmail.com',
      username  : 'jacobAdams',
      password  : 'password',
      facilityID: '101',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Soham',
      lastName  : 'Silva',
      email     : 'usernine@gmail.com',
      username  : 'sohamSilva',
      password  : 'password',
      facilityID: '101',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Sue',
      lastName  : 'Kelley',
      email     : 'userten@gmail.com',
      username  : 'sueKelley',
      password  : 'password',
      facilityID: '102',
      userID    : sid.generate(),
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'June',
      lastName  : 'Phillips',
      email     : 'usereleven@gmail.com',
      username  : 'junePhillips',
      password  : 'password',
      facilityID: '102',
      userID    : sid.generate(),
      admin     : null,
      counselor : true,
    },
    {
      firstName : 'April',
      lastName  : 'Ortiz',
      email     : 'usertwelve@gmail.com',
      username  : 'aprilOrtiz',
      password  : 'password',
      facilityID: '102',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Roger',
      lastName  : 'Pierce',
      email     : 'userthirteen@gmail.com',
      username  : 'rogerPierce',
      password  : 'password',
      facilityID: '102',
      userID    : sid.generate(),
      admin     : null,
      counselor : null,
    },
  ];

  User.remove({}, () => {
    for (let i = 0; i < users.length; i++) {
      const data     = users[i];
      const userData = {
        firstName : data.firstName,
        lastName  : data.lastName,
        email     : data.email,
        username  : data.username,
        password  : data.password,
        facilityID: data.facilityID,
        userID    : data.userID,
        admin     : data.admin,
        counselor : data.counselor,
      };
      User.create(userData, (error, user) => {
        if (error) {
          console.log('Error creating user', error);
        } else {
          //console.log('User created!', user);
        }
      });
    }
  })
  .catch(error => {
    console.log(error);
  });
};

// auth:login -------------------------------------------------------------------

module.exports.login = (req, res) => {
  console.log('login', req.body.email, req.body.password);
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log('failure', error, user);
      const error  = new Error('Wrong email or password.');
      error.status = 401;
      res.status(401).send(error);
    } else {
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
      userID    : sid.generate(),
    };
    User.create(userData, function (error) {
      if (error) {
        res.status(403).send(error);
      } else {
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
      doLog && console.log(`create user result: ${user}`);
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
  const action     = 'get_users';
  const userID     = req.session.user._id;
  const facilityID = req.session.user.facilityID;
  User.find({
    facilityID
  }, (error, users) => {
    doLog && console.log(`get users result: ${users}`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, ip: req.ip});
      res.status(200).send(users);
    }
  })
};

// read -------------------------------------------------------------------

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
    doLog && console.log(`get user result: ${user} (if value is null there may be no user with this id at the requestor's facility)`);
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
    doLog && console.log(`delete user result: ${user} (if value is null there may be no user with this id at the requestor's facility)`);
    if (error) {
      logging.logApiError({action, userID: req.session.user._id, code: 404, error: {msg: error.msg}, ip: req.ip});
      res.status(404).send(RESPONSE.NOT_FOUND_404({msg: error.msg}));
    } else {
      logging.logUserAction({action, userID, targetID: req.params.id, ip: req.ip});
      res.status(200).send(user);
    }
  })
};




