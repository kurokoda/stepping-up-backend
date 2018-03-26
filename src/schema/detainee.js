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

Schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.v;
  return obj;
};
const CryptoJS        = require('crypto-js');

const data = [{id: 1}, {id: 2}]

const ciphertext    = CryptoJS.AES.encrypt(JSON.stringify(data), config.CRYPTO_PASSWORD);
const bytes         = CryptoJS.AES.decrypt(ciphertext.toString(), config.CRYPTO_PASSWORD);
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

const Detainee = mongoose.model('Detainee', Schema);

module.exports = Detainee;