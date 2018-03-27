const mongoose = require('mongoose');
const config   = require('../config');

const primaryDatabase   = mongoose.createConnection(config.SU_URI_APP_DB);
const secondaryDatabase = mongoose.createConnection(config.SU_URI_PHI_DB);

module.exports.secondaryDatabase = secondaryDatabase;
module.exports.primaryDatabase   = primaryDatabase;



