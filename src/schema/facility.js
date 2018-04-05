const mongoose = require('mongoose');
const databases = require('../service/database')

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
  admins : {
    type   : Array,
    default: [],
  },
  users : {
    type   : Array,
    default: [],
  },
  counselors : {
    type   : Array,
    default: [],
  },
  detainees : {
    type   : Array,
    default: [],
  },
});

// TODO upddate output filtering

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
};

const Facility = databases.primaryDatabase.model('Facility', Schema);
module.exports = Facility;
