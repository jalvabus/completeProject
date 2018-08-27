

    var router = require('express').Router();
    var passport = require('./../config/auth');
    var jwt = require('jsonwebtoken')
    var Pieza = require('../api/pieza/pieza.model')
    var Cliente = require('../api/cliente/cliente.model');
    var Marca = require('./marca/marca.model');
    var Requisicion = require('../api/requisicion/requisicion.model');
    var LocalStorage = require('node-localstorage').LocalStorage,
        localStorage = new LocalStorage('./scratch');

    const secret = 'ancient11251022017'
     
    router.post('/login', function (req, res, next) {

        passport.authenticate('local', function (err, usuario) {
            if (err) return next(err);
            if (!usuario) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                return res.json(jwt.sign({ _id: usuario._id }, secret));
            }
        })(req, res, next);
    });

    router.post('/validarClave', function (req, res) {

        Requisicion.findOne({ claveAcceso: req.body.clave })
            .then((requisicion) => {
                if (requisicion) {
                    localStorage.setItem('id', requisicion._id);
                    res.redirect('/piezas');
                } else {
                    localStorage.setItem('id', '');
                    res.render('./acceso.ejs', { error: 'La clave que ingreso es incorrecta' });
                }

            })



    })
    router.get('/piezas/', (req, res) => {


        if (localStorage.getItem('id') != '') {
            Requisicion.findById(localStorage.getItem('id'))
                .populate({ path: 'usuario', model: 'Usuario' })
                .populate({ path: 'cliente', model: 'Cliente' })
                .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
                .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })
                .then((requisicion) => {

                    res.render('piezas2.ejs', { requisicion: requisicion })
                })
        } else {
            res.render('./acceso.ejs', { error: '' });
        }





    })



    router.get('/pieza/:id', (req, res) => {
        Pieza.findOne({ noPieza: req.params.id, "deletedAt": { "$exists": false } })
            .populate({ path: 'marca', ref: 'Marca' })
            .then((pieza) => {

                res.json(pieza)
            }).catch((err) => {
                console.log(err)
            })

    })

    router.get('/cliente/:nombre', (req, res) => {
        Cliente.findOne({ nombre: req.params.nombre })

            .then((cliente) => {

                res.json(cliente)
            }).catch((err) => {
                console.log(err)
            })

    })
    router.get('/marca/:nombre', (req, res) => {
        Marca.findOne({ nombre: req.params.nombre })
            .then((marca) => {
                res.json(marca)
            })
    })




    module.exports = router;