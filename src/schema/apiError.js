const mongoose = require('mongoose');

// TODO add type precision

const Schema = new mongoose.Schema({
  userID: {
    type: String,
    trim: true,
  },
  date  : {
    type: String,
    trim: true,
  },
  action: {
    type: String,
    trim: true,
  },
  code  : {
    type: String,
    trim: true,
  },
  ip    : {
    type: String,
    trim: true,
  },
  error : {
    type: Object,
    trim: true,
  },
});

const ApiError = mongoose.model('ApiError', Schema);
module.exports = ApiError;
