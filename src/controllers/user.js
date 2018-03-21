const User    = require('../schema/user');
const logging = require('../service/logging');

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
  console.log('login', req.body.email, req.body.password)
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log('failure', error, user)
      const error  = new Error('Wrong email or password.');
      error.status = 401;
      res.status(401).send(error);
    } else {
      console.log('success', error, user)
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

// create -------------------------------------------------------------------

module.exports.signup = (req, res) => {
  const action = 'sgnup_user';
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.facilityID
  ) {
    console.log('past req check', req.body);
    const userData = {
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      email     : req.body.email,
      username  : req.body.username,
      password  : req.body.password,
      facilityID: req.body.facilityID,
    };
    User.create(userData, function (error) {
      if (error) {
        console.log('create error', error);
        res.status(403).send(error);
      } else {
        User.findOne({email: userData.email}, function (error, user) {
          if (error) {
            console.log('find error', error);
            res.status(404).send(error);
          } else {
            const userID = user._id;
            console.log('found user', user._id);
            logging.logUserAction({action, userID});
            res.status(200).send();
          }
        })
      }
    })
  } else {
    console.log('else error', req.body);
    const code = 403;
    const date = new Date();
    logging.logApiError({action, code, date, error: {msg: 'required data not provided'}});
    console.log(error);
  }
};

// read all -------------------------------------------------------------------

module.exports.all = (req, res) => {
};

// read -------------------------------------------------------------------

module.exports.get = (req, res) => {
};

// update -------------------------------------------------------------------

module.exports.patch = (req, res) => {
};

// delete -------------------------------------------------------------------

module.exports.delete = (req, res) => {
};




