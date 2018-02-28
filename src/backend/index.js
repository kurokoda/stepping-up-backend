const express      = require('express');
const path         = require('path');
const mongoose     = require('mongoose');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const config       = require('./config');
const cookieParser = require('cookie-parser');

const app = express();

let database;

// Mongoose DB ----------------------------------------------------------------------

if (config.MONGO_URI) {
  mongoose.connect(config.MONGO_URI);
  const database = mongoose.connection;
  database.on('error', console.error.bind(console, 'connection error:'));
  database.once('open', function () {
    console.log('mongo database connected');
  });
}

// Use ----------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '..', 'frontend/build', 'favicon.ico')));

// Routing ----------------------------------------------------------------------

app.get('/api/foo', (req, res) => {
  res.send('Foo has been sent')
});

// Error Handling ----------------------------------------------------------------------

app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Init ----------------------------------------------------------------------

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`app listening on ${port}`);
