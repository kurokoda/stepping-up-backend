const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');


const UserSchema = new mongoose.Schema({
  nameFirst   : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  nameLast    : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  username    : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  email       : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  password    : {
    type    : String,
    required: true,
  },
  facilityCode: {
    type    : String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
}

UserSchema.statics.authenticate = function (email, password, callback) {
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
      console.log(password, user.password);
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;