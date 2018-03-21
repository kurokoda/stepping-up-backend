const mongoose = require('mongoose');
const id       = 'Facility';

// TODO add type precision

const Schema = new mongoose.Schema({
  facilityID: {
    type    : String,
    required: true,
    trim    : true,
    unique  : true,
  },
  name      : {
    type    : String,
    required: true,
    trim    : true
  },
  address   : {
    type    : String,
    required: true,
    trim    : true,
  },
  city      : {
    type    : String,
    required: true,
    trim    : true,
  },
  state     : {
    type    : String,
    required: true,
    trim    : true,
  },
  zip       : {
    type    : String,
    required: true,
    trim    : true,
  },
});

// TODO upddate output filtering

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
};

const Facility = mongoose.model('Facility', Schema);
module.exports = Facility;
