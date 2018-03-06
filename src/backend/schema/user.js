const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email   : {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  username: {
    type    : String,
    unique  : true,
    required: true,
    trim    : true
  },
  password: {
    type    : String,
    required: true,
  },
});

UserSchema.statics.authenticate = function (email, password, callback) {
  console.log(email);
  User.findOne({email: email})
  .exec(function (err, user) {
    // if (err) {
    //   return callback(err)
    // } else if (!user) {
    //   const err    = new Error('User not found.');
    //   err.status = 401;
    //   return callback(err);
    // }
    // bcrypt.compare(password, user.password, function (err, result) {
    //   if (result === true) {
    //     return callback(null, user);
    //   } else {
    //     return callback();
    //   }
    // })
    console.log(user);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;