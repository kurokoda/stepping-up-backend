const mongoose = require('mongoose');
const config   = require('../config');
const databases = require('../service/database')

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

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.v;
  return obj;
};

const Detainee = databases.primaryDatabase.model('Detainee', Schema);
module.exports = Detainee;