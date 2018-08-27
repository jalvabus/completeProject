var express = require('express');
var router = express.Router();

var controller = require('./gasto.controller');

router.post('/', controller.registrarGasto);
router.post('/reporte', controller.verReporte);
router.put('/', controller.registrarGastoCajaChica);
router.post('/getGasto', controller.verGasto);

module.exports = router;