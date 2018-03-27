const mongoose = require('mongoose');
const id       = 'Screen';

// TODO add type precision

const Schema = new mongoose.Schema({});

// TODO add output filtering

const Screen   = mongoose.model('Screen', Schema);
module.exports = Screen;