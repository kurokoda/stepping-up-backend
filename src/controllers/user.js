const User = require('../schema/user');

module.exports.seed = () => {
  const users = [
    {
      firstName: 'Norman',
      lastName : 'Snyder',
      email    : 'userone@gmail.com',
      username : 'normanSnyder',
      password : 'password',
      facility : '100',
      admin    : true,
      counselor: null,
    },
    {
      firstName: 'Bertha',
      lastName : 'Martinez',
      email    : 'usertwo@gmail.com',
      username : 'berthaMartinez',
      password : 'password',
      facility : '100',
      admin    : null,
      counselor: true,
    },
    {
      firstName: 'Bella',
      lastName : 'Bailey',
      email    : 'userthree@gmail.com',
      username : 'bellaBailey',
      password : 'password',
      facility : '100',
      admin    : null,
      counselor: null,
    },
    {
      firstName: 'Dan',
      lastName : 'Lawson',
      email    : 'userfive@gmail.com',
      username : 'danLawson',
      password : 'password',
      facility : '100',
      admin    : null,
      counselor: null,
    },
    {
      firstName: 'Irma',
      lastName : 'Williams',
      email    : 'usersix@gmail.com',
      username : 'irmaWilliams',
      password : 'password',
      facility : '101',
      admin    : true,
      counselor: null,
    },
    {
      firstName: 'Armando',
      lastName : 'Harper',
      email    : 'userseven@gmail.com',
      username : 'armandoHarper',
      password : 'password',
      facility : '101',
      admin    : null,
      counselor: true,
    },
    {
      firstName: 'Jacob',
      lastName : 'Adams',
      email    : 'usereight@gmail.com',
      username : 'jacobAdams',
      password : 'password',
      facility : '101',
      admin    : null,
      counselor: null,
    },
    {
      firstName: 'Soham',
      lastName : 'Silva',
      email    : 'usernine@gmail.com',
      username : 'sohamSilva',
      password : 'password',
      facility : '101',
      admin    : null,
      counselor: null,
    },
    {
      firstName: 'Sue',
      lastName : 'Kelley',
      email    : 'userten@gmail.com',
      username : 'sueKelley',
      password : 'password',
      facility : '102',
      admin    : true,
      counselor: null,
    },
    {
      firstName: 'June',
      lastName : 'Phillips',
      email    : 'usereleven@gmail.com',
      username : 'junePhillips',
      password : 'password',
      facility : '102',
      admin    : null,
      counselor: true,
    },
    {
      firstName: 'April',
      lastName : 'Ortiz',
      email    : 'usertwelve@gmail.com',
      username : 'aprilOrtiz',
      password : 'password',
      facility : '102',
      admin    : null,
      counselor: null,
    },
    {
      firstName: 'Roger',
      lastName : 'Pierce',
      email    : 'userthirteen@gmail.com',
      username : 'rogerPierce',
      password : 'password',
      facility : '102',
      admin    : null,
      counselor: null,
    },
  ];

  User.remove({}, () => {
    for (let i = 0; i < users.length; i++) {
      const data     = users[i];
      const userData = {
        firstName: data.firstName,
        lastName : data.lastName,
        email    : data.email,
        username : data.username,
        password : data.password,
        facility : data.facility,
        admin    : data.admin,
        counselor: data.counselor,
      };
      User.create(userData, (err, user) => {
        if (err) {
          console.log('Error creating user', err);
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

module.exports.login = (req, res) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log('login fail');
      const err  = new Error('Wrong email or password.');
      err.status = 401;
      res.status(401).send(err);
    } else {
      req.session.userId = user._id;
      res.status(200).send(user);
      console.log('login: success');
      console.log('Session id:', req.session.id);
      console.log('Session:', req.session);
    }
  });
};

module.exports.logout = (req, res) => {
  if (req.session) {
    console.log('logout: success');
    console.log('Session id:', req.session.id);
    console.log('Session:', req.session);
    req.session.destroy(function (err) {
      if (err) {
        res.status(500).send({express: 'logout error', params: req.body});
      } else {
        res.status(200).send({express: 'logout successful', params: req.body});
      }
    });
  }
};

module.exports.signup = (req, res) => {
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.facility
  ) {
    const userData = {
      firstName: req.body.firstName,
      lastName : req.body.lastName,
      email    : req.body.email,
      username : req.body.username,
      password : req.body.password,
      facility : req.body.facility,
    };
    User.create(userData, function (err) {
      if (err) {
        console.log('signup error', err);
        res.status(403).send(err);
      } else {
        console.log('signup success');
        res.status(200).send();
      }
    });
  }
};
