var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var Usuario = require('./api/usuario/usuario.model');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var axios = require('axios');
var fs = require('fs');
var request = require('request')
var passport = require('./passport');


Promise.promisifyAll(bcrypt);

mongoose.connect('mongodb://localhost:31845/repase') //31845


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, './../dist')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/acceso', (req, res) => {
    res.render('acceso.ejs',{error:''});
})

app.use('/api', require('./api/api'));
app.use('/', require('./api/'));
app.use('/reportes', require('./api/reportes'));
app.get('/vendedor', (req, res) => {
    var usuario = new Usuario({
        nombre: 'Joaquin',
        apellidos: 'Solis',
        usuario: 'joaquin',
        rol: 'V',
        email: { email: 'cpaniagua@gmail.com', password: 'cesarodrigo' }
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('repase17', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})


app.get('/capturista', (req, res) => {
    var usuario = new Usuario({
        nombre: 'Emiliano',
        apellidos: 'Cambiassi',
        usuario: 'emiliano',
        rol: 'C',
        email: { email: 'cpaniagua@gmail.com', password: 'cesarodrigo' }
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('repase17', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})
app.get('/admin', (req, res) => {
    var usuario = new Usuario({
        nombre: 'Giselle',
        apellidos: 'Hernández Quintero',
        usuario: 'giselle',
        rol: 'A',
        email: { email: 'giselle@repase.mx', password: 'gisquintl94' }
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync('repase17', salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            console.log(usuario);
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})



app.listen(16709, function () {
    console.log("corriendo en puero 16709")
})
