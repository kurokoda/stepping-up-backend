const mongoose = require('mongoose');

const id = 'Facility';

const FacilitySchema = new mongoose.Schema({
  id     : {
    type    : String,
    required: true,
    trim    : true,
    unique  : true,
  },
  name   : {
    type    : String,
    required: true,
    trim    : true
  },
  address: {
    type    : String,
    required: true,
    trim    : true,
  },
  city   : {
    type    : String,
    required: true,
    trim    : true,
  },
  state  : {
    type    : String,
    required: true,
    trim    : true,
  },
  zip    : {
    type    : String,
    required: true,
    trim    : true,
  },
});

FacilitySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
};

const Model = mongoose.model(id, FacilitySchema);

module.exports = Model;