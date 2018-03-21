const mongoose = require('mongoose');
const id       = 'Schema';

// TODO add type precision

const Schema = new mongoose.Schema({
  date    : {
    type: String,
    trim: true,
  },
  action  : {
    type: String,
    trim: true,
  },
  userID  : {
    type: String,
    trim: true,
  },
  targetID: {
    type: String,
    trim: true,
  },
});

const UserAction = mongoose.model('UserAction', Schema);
module.exports = UserAction;