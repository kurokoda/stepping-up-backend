const mongoose = require('mongoose');

const id = 'Detainee';

const Schema = new mongoose.Schema({
  gender   : {
    type    : String,
    required: true,
    trim    : true
  },
  name: {
    type    : Object,
    required: true,
  },
});

const Detainee = mongoose.model(id, Schema);

module.exports = Detainee;