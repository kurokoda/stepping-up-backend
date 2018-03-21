const mongoose = require('mongoose');
const id       = 'Detainee';

// TODO add type precision

const Schema = new mongoose.Schema({
  gender    : {
    type    : String,
    required: true,
    trim    : true
  },
  detaineeID: {
    type    : String,
    required: true,
    trim    : true
  },
  firstName : {
    type    : String,
    required: true,
  },
  lastName  : {
    type    : String,
    required: true,
  },
  facilityID: {
    type    : String,
    required: true,
  },
});

// TODO add output filtering

const Detainee = mongoose.model('Detainee', Schema);
module.exports = Detainee;