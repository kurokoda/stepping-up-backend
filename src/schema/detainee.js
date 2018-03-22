const mongoose = require('mongoose');
const config   = require('../config');

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

// const encrypt  = require('mongoose-encryption');
// Schema.plugin(encrypt, {
//   // encryptionKey        : config.SOME_32BYTE_BASE64_STRING,
//   // signingKey           : config.SOME_64BYTE_BASE64_STRING,
//   secret               : 'zxcuhiurwhkjhzciolknejbcdubkjbsdkbka',
//   excludeFromEncryption: ['facilityID', 'detaineeID']
// });

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.v;
  return obj;
};

const Detainee = mongoose.model('Detainee', Schema);

module.exports = Detainee;