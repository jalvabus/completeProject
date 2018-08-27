var express = require('express');
var router = express.Router();

router.get('/auth/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/administrador', (req, res) => {
    res.render('administrador/administrador.ejs');
})

router.get('/index', (req, res) => {
    res.render('index.ejs');
})

router.get('/cajachica/:id', (req, res) => {
    res.render('obras/cajaChica.ejs', { obra: req.params.id });
})

router.get('/conceptos', (req, res) => {

})

router.get('/cuenta-bancaria', (req, res) => {
    res.render('cuenta-bancaria/cuentas.ejs');
})

router.get('/depositos/:id', (req, res) => {
    res.render('cuenta-bancaria/depositos.ejs', { cuenta: req.params.id });
})

router.get('/obras', (req, res) => {
    res.render('obras/obra.ejs');
})

router.get('/detalleObra/:id', (req, res) => {
    res.render('obras/detalleObra.ejs', { obra: req.params.id });
})

router.get('/proveedores', (req, res) => {
    res.render('proveedores/proveedores.ejs');
})

router.get('/reportes', (req, res) => {
    res.render('reportes/reportes.ejs');
})

router.get('/destajistas', (req, res) => {
    res.render('destajistas/destajistas.ejs');
})

router.get('/requerimientos', (req, res) => {
    res.render('requerimientos/requerimientos.ejs');
})

router.get('/getUser', (req, res) => {
    res.json(req.user);
})

module.exports = router;