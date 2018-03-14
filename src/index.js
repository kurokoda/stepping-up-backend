const bodyParser     = require('body-parser');
const config         = require('./config');
const cookieParser   = require('cookie-parser');
const express        = require('express');
const logger         = require('morgan');
const mongoose       = require('mongoose');
const path           = require('path');
const session        = require('express-session');
const questionRouter = require('./routes/user');
const userRouter     = require('./routes/user');
const screenRouter   = require('./routes/screen');
const facilityRouter = require('./routes/facility');
const detaineeRouter = require('./routes/detainee');


const app = express();

let database;

// Mongoose DB ----------------------------------------------------------------------

if (config.MONGO_URI) {
  mongoose.connect(config.MONGO_URI);
  const database = mongoose.connection;
  database.on('error', console.error.bind(console, 'connection error:'));
  database.once('open', function () {
    console.log('mongo database connected');
    const facilityController = require('./controllers/facility');
    const detaineeController = require('./controllers/detainee');
    const userController     = require('./controllers/user');
    facilityController.seed();
    userController.seed();
    detaineeController.seed();
  });
}

// Set ----------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use ----------------------------------------------------------------------

app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, '..', 'frontend/build/static'))); For certificates
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

app.get('/test', (req, res) => {
  res.status(200).send('connected');
});

app.use(questionRouter);
app.use(userRouter);
app.use(screenRouter);
app.use(facilityRouter);
app.use(detaineeRouter);


// Error Handling ----------------------------------------------------------------------

app.use(function (req, res, next) {
  var err    = new Error('Not Found'); // fix
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
