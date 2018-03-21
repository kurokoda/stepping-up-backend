const mongoose = require('mongoose');
const id       = 'Question';

// TODO add type precision

const Schema = new mongoose.Schema({});

// TODO add output filtering

const Question = mongoose.model('Question', Schema);
module.exports = Question;