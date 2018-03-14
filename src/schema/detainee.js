const mongoose = require('mongoose');

const id = 'Detainee';

const Schema = new mongoose.Schema({
  gender   : {
    type    : String,
    required: true,
    trim    : true
  },
  firstName: {
    type    : String,
    required: true,
  },
  lastName : {
    type    : String,
    required: true,
  },
  facility : {
    type    : String,
    required: true,
  },
});

const Detainee = mongoose.model(id, Schema);

module.exports = Detainee;