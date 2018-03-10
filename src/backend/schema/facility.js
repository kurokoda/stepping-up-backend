const mongoose = require('mongoose');

const id = 'Site';

const Schema = new mongoose.Schema({});

const Model = mongoose.model(id, Schema);

module.exports = Model;