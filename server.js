var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var http = require('http');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

var app = express();

//keep reference to config
app.config = config;

//setup the web server
app.server = http.createServer(app);

//setup mongoose
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
    console.log('Mongo connection enabled!...');
});
//config data models
require('./models')(app, mongoose);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(require('compression')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(require('method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(config.cryptoKey));

var sess = {
    resave: false,
    saveUninitialized: true,
    secret: config.cryptoKey,
    cookie: {}
};
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
helmet(app);

//setup passport
require('./passport')(app, passport);

//setup routes
require('./routes')(app, passport);

// error handlers
// catch 404 and forward to error handler
app.use(require('./server/http/index').http404);

//custom (friendly) error handler
app.use(require('./server/http/index').http500);

//setup utilities
app.utility = {};
app.utility.workflow = require('./util/workflow');

//listen up
app.server.listen(app.config.port, function () {
    //and... we're live
    console.log('Server is running on port ' + config.port);
});

module.exports = app;
