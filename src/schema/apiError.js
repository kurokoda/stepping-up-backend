const mongoose = require('mongoose');
const id       = 'ApiError';

// TODO add type precision

const Schema = new mongoose.Schema({
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
  error : {
    type: String,
    trim: true,
  },
});

const ApiError = mongoose.model('ApiError', Schema);
module.exports = ApiError;
