// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multer = require('multer');
var fs = require('fs');
var ejs = require('ejs');

var session = require('express-session');
var cookieParser = require('cookie-parser')

// configuration =================

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

mongoose.connect('mongodb://localhost:27017/example') //31845

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

// sessions with Express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cookieParser());

/**
 * Passport Config
 */

require('./config/passport')(app);
app.use('/', require('./controller'));


// server.js

// application -------------------------------------------------------------
app.get('/login', function (req, res) {
    res.render('login.ejs'); // load the single view file (angular will handle the page changes on the front-end)
});
// application -------------------------------------------------------------
app.get('/ingresar', function (req, res) {
    console.log(req);
    res.render('index.ejs'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/salir', function (req, res) {
    req.logout();
    res.render('index.ejs'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// define model =================
var Todo = mongoose.model('Todo', {
    text: String
});


// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function (req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function (req, res) {
    console.log(req.body)
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

var upload = multer({ dest: 'uploads/' });

app.post('/api/fileupload', upload.any(), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    if (req.files) {
        if (req.files.length > 1) {
            req.files.forEach((file) => {
                var filename = (new Date).valueOf() + "-" + file.originalname;
                fs.rename(file.path, "uploads/" + filename, (err) => {
                    if (err) throw err;
                    console.log(filename);
                })
            })
        } else {

        }
    }
    res.send({
        mesage: "OK",
        errores: "0"
    });
});

