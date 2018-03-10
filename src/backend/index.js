const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const session      = require('express-session');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const config       = require('./config');

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

// Set ----------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use ----------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '..', 'frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret           : 'work hard',
  resave           : true,
  saveUninitialized: false
}));

// Routing ----------------------------------------------------------------------

app.get('/api/hello', (req, res) => {
  res.send({express: 'Die From Express'});
});

app.post('/api/user/signup', (req, res, next) => {
  const controller = require('./controllers/user');
  controller.signup(req, res, next);
});

app.post('/api/user/login', (req, res, next) => {
  const controller = require('./controllers/user');
  controller.login(req, res, next);
});

app.post('/api/user/logout', (req, res) => {
  const controller = require('./controllers/user');
  controller.logout(req, res);
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
