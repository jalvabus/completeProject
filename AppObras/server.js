// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var session = require('express-session');
var cookieParser = require('cookie-parser')
//var passport = require('passport');
//require('./config/passport')(passport);

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

mongoose.connect('mongodb://207.38.86.190:31845/gremisa') //31845
// mongoose.connect('mongodb://localhost:27017/gremisa') //31845

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
console.log(__dirname + '/public');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

/*
// sessions with Express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
*/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// application -------------------------------------------------------------
app.use('/', require('./api/routing/routes'));
//app.use('/', require('./api/index'));
//app.use('/auth/', require('./api'));
app.use('/api/', require('./api/api'));

// application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.render('obras/obra.ejs'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(11689);
console.log("Gremisa listening on port 11689");