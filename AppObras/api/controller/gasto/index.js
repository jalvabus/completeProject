var express = require('express');
var router = express.Router();

var controller = require('./gasto.controller');

router.post('/', controller.registrarGasto);
router.post('/reporte', controller.verReporte);

module.exports = router;