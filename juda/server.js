var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var colors = require('colors');
var port = 4523;

var multer = require('multer');

var fs = require('fs');

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

mongoose.connect('mongodb://localhost:27017/repase') //31845

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(function (req, res, next) { //allow cross origin requests
    //res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    next();
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

let routes = require('./api');
app.use('/', routes);

app.use(function (req, res) {
    res.status(404).json('Not found')
})

app.use(function (err, req, res) {
    console.error(err)
    res.status(500).json({
        message: 'Ocurrió algo inesperado dentro de la aplicación',
    })
});

app.listen(port, () => {
    console.log(colors.green("\n********* El leon de juda funcionando en el puerto: " + port + " ***********"));
});