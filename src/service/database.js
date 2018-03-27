const mongoose = require('mongoose');
const config   = require('../config');

const primaryDatabase   = mongoose.createConnection(config.MONGO_URI);
const secondaryDatabase = mongoose.createConnection(config.MONGO_URI_PHI);

module.exports.secondaryDatabase = secondaryDatabase;
module.exports.primaryDatabase   = primaryDatabase;



