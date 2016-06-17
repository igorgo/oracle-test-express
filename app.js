var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

var routes = require('./routes/index');
var agents = require('./routes/agents');
var rest = require('./routes/rest');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    store: new SQLiteStore,
    secret: 'papuaz',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000} // 1 day
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(function (req, res, next) {
    console.log(req.session);
    if (!req.session.isLogged) {
        var user = "GUEST",
            pass = "guest";
        require("./db/database").login(
            {
                username: user,
                password: pass,
                sessionID: req.sessionID,
                session: req.session
            }
        )
            .then( function() {
                next();
            })
            .catch(function (error) {
                req.session.isLogged = false;
                //res.sendStatus(500);
                next(error);
            });
    } else next();
});

app.use('/', routes);
app.use('/agents', agents);
app.use('/rest', rest);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
