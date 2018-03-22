const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// TODO add type precision

const Schema = new mongoose.Schema({
  firstName : {
    type    : String,
    required: true,
    trim    : true
  },
  lastName  : {
    type    : String,
    required: true,
    trim    : true
  },
  username  : {
    type    : String,
    required: true,
    trim    : true
  },
  email     : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  password  : {
    type    : String,
    required: true,
  },
  facilityID: {
    type    : String,
    required: true,
  },
  userID    : {
    type    : String,
    unique  : true,
    required: true,
  },
  admin     : {
    type: Boolean,
  },
  counselor : {
    type: Boolean,
  },
});

Schema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
};

Schema.statics.authenticate = function (email, password, callback) {
  User.findOne({email: email})
  .exec(function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      const err  = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  });
};

const User     = mongoose.model('User', Schema);
module.exports = User;