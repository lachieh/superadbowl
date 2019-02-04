const createError = require('http-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const app = express();
const server = require('http').Server(app);
const sockets = require('./lib/sockets');

const voteRouter = require('./routes/vote');
const userRouter = require('./routes/user');
const videosRouter = require('./routes/videos');
const setupAuth = require('./lib/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
}));

// Authentication
setupAuth(app);

// IO
sockets.connect(server);

// Routes
app.use('/api/vote', voteRouter);
app.use('/api/user', userRouter);
app.use('/api/videos', videosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  server,
};
