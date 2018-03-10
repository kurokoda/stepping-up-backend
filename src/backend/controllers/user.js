const Schema = require('../schema/user');

module.exports.login = (req, res) => {
  Schema.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log('login fail')
      const err  = new Error('Wrong email or password.');
      err.status = 401;
      res.status(401).send(err);
    } else {
      console.log('login success')
      req.session.userId = user._id;
      res.status(200).send(user);
    }
  });
};

module.exports.logout = (req, res) => {
  if (req.session) {
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
    req.body.nameFirst &&
    req.body.nameLast &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.facilityCode
  ) {
    const userData = {
      nameFirst   : req.body.nameFirst,
      nameLast    : req.body.nameLast,
      email       : req.body.email,
      username    : req.body.username,
      password    : req.body.password,
      facilityCode: req.body.facilityCode,
    };
    Schema.create(userData, function (err) {
      if (err) {
        res.status(403).send(err);
      } else {
        res.status(200).send();
      }
    });
  }
};
