var express = require('express');
var router = express.Router();

var multer = require('multer');
var fs = require('fs');

var controller = require('./obra.controller');
var upload = multer({ dest: 'uploads/' });

router.get('/', controller.verTodas);
router.post('/', upload.any(), controller.registrarObra);

router.get('/:id', controller.obtenerObra);
router.put('/:id', controller.modificarObra);
router.delete('/:id', controller.eliminarObra);

router.post('/registrarEstimacion/:id', controller.registrarEstimacion);
router.put('/pagarEstimacion/:idObra/:idEstimacion', controller.pagarEstimacion);

router.put('/pagarAnticipo/:idObra', controller.pagarAnticipo);
router.get('/recuperarEstimacion/:idObra/:idEstimacion', controller.recuperarEstimacion);

module.exports = router;