const mongoose = require('mongoose');
const databases = require('../service/database')

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
  ip: {
    type: String,
    trim: true,
  },
});

const UserAction = databases.primaryDatabase.model('UserAction', Schema);
module.exports = UserAction;