const bodyParser     = require('body-parser');
const config         = require('./config');
const cors           = require('cors');
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

const MongoStore = require('connect-mongo')(session);

const app = express();


// Mongoose DB ----------------------------------------------------------------------

if (config.MONGO_URI) {
  const database = mongoose.connection;
  mongoose.connect(config.MONGO_URI);
  database.on('connect', console.log.bind(console, 'connection success:'));
  database.on('error', console.error.bind(console, 'connection error:'));
  database.once('open', function () {
    // const facilityController = require('./controllers/facility');
    // const detaineeController = require('./controllers/detainee');
    // const userController     = require('./controllers/user');
    // facilityController.seed();
    // userController.seed();
    // detaineeController.seed();
  });
}

// Set ----------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use ----------------------------------------------------------------------

const corsConfig = {
  origin              : ['http://localhost:3000', 'https://stepping-up-frontend.herokuapp.com'],
  allowedHeaders      : ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Cache'],
  methods             : ['GET', 'POST'],
  credentials         : true,
  optionsSuccessStatus: 200,
};

const storeConfig = {
  mongooseConnection: mongoose.connection,
};

const sessionConfig = {
  secret           : 'b5b617a79a20d59a7d691fb8d7595b9e',
  name             : 'stepping-up-session',
  resave           : true,
  saveUninitialized: false,
  store            : new MongoStore(storeConfig),
  cookie           : {
    secure  : false,
    httpOnly: false,
    expires : new Date(Date.now() + 60 * 60 * 1000)
  }
};

app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Routing ----------------------------------------------------------------------

app.get('/test', (req, res) => {
  res.status(200).send({data: 'test'});
  console.log('test: success');
  console.log('Session id:', req.session.id);
  console.log('Session:', req.session);
});

app.use(questionRouter);
app.use(userRouter);
app.use(screenRouter);
app.use(facilityRouter);
app.use(detaineeRouter);


// Error Handling ----------------------------------------------------------------------

app.use(function (req, res, next) {
  const err  = new Error('Not Found');
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
