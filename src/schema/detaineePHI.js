const mongoose  = require('mongoose');
const config    = require('../config');
const databases = require('../service/database');

// TODO add type precision

const Schema = new mongoose.Schema({
  gender: {
    type    : String,
    required: true,
    trim    : true
  },
  pii  : {
    type    : String,
    required: true,
    trim    : true,
  },
});

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.v;
  return obj;
};

const Detainee = databases.secondaryDatabase.model('Detainee', Schema);
module.exports = Detainee;