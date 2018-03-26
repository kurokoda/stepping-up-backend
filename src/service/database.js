module.exports.appDatabase = null;
module.exports.phiDatabase = null;

module.exports.setApplicationDatabase = (connection) => {
  if (this.appDatabase) return;
  this.appDatabase = connection;
};

module.exports.setPHIDatabase = (connection) => {
  if (this.phiDatabase) return;
  this.phiDatabase = connection;
};

