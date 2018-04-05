const bodyParser     = require('body-parser');
const config         = require('./config');
const cors           = require('cors');
const cookieParser   = require('cookie-parser');
const express        = require('express');
const logger         = require('morgan');
const mongoose       = require('mongoose');
const path           = require('path');
const session        = require('express-session');
const databases      = require('./service/database');
const questionRouter = require('./routes/user');
const userRouter     = require('./routes/user');
const screenRouter   = require('./routes/screen');
const facilityRouter = require('./routes/facility');
const detaineeRouter = require('./routes/detainee');
const MongoStore     = require('connect-mongo')(session);

const app          = express();
const isProduction = process.env.NODE_ENV !== 'development';

console.log('A murder of crows');

// Mongoose DB ----------------------------------------------------------------------

databases.primaryDatabase.on('connect', console.log.bind(console, 'db connection success:'));
databases.primaryDatabase.on('error', console.error.bind(console, 'db connection error:'));
databases.primaryDatabase.once('open', function () {
  // require('./controllers/_seed').facilities();
  // require('./controllers/_seed').users();
  // require('./controllers/_seed').detainees();
});

// Settings ----------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware ----------------------------------------------------------------------


const corsConfig = {
  origin              : [
    'https://stepping-up-frontend.herokuapp.com',
    'https://stepping-up-backend.herokuapp.com',
    'http://localhost:3000'
  ],
  allowedHeaders      : ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Cache'],
  methods             : ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials         : true,
  optionsSuccessStatus: 200,
};

const storeConfig = {
  mongooseConnection: databases.primaryDatabase,
};

const sessionConfig = {
  secret           : 'b5b617a79a20d59a7d691fb8d7595b9e',
  name             : 'stepping-up-session',
  resave           : true,
  saveUninitialized: false,
  store            : new MongoStore(storeConfig),
  cookie           : {
    secure  : false,
    httpOnly: true,
    maxAge  : 60 * 60 * 1000,
  }
};

app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Static assets ----------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'static')));

// Routing middleware----------------------------------------------------------------------

app.get('/test', (req, res) => {
  res.sendStatus(200)
})

app.use(questionRouter);
app.use(userRouter);
app.use(screenRouter);
app.use(facilityRouter);
app.use(detaineeRouter);

app.get('*', (req, res) => {
  res.sendFile('/index.html');
});


// Error middleware ----------------------------------------------------------------------

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
