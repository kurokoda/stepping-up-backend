const User = require('../schema/user');

module.exports.login = (req, res) => {
  console.log('login request received', req.body);
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      const err  = new Error('Wrong email or password.');
      err.status = 401;
      console.log('Wrong email or password.');
      res.send(err);
    } else {
      console.log('login request approved');
      res.status(200).send({express: 'signup request received', params: req.body});
    }
  });
};

module.exports.logout = (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        console.log('logout successful');
        res.status(200).send({express: 'logout successful', params: req.body});
      }
    });
  }
};

module.exports.signup = (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password
  ) {
    const userData = {
      email   : req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        console.log('Error creating user.');
        res.status(403).send({express: 'signup request received', params: req.body});
      } else {
        console.log('User created!');
        res.status(200).send({express: 'signup request received', params: req.body});
      }
    });
  }
};
