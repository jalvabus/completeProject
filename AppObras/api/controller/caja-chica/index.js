var express = require('express');
var router = express.Router();
var controller = require('./caja-chica.controller');

router.get('/' , controller.obtenerCajaChica);
router.put('/:id/depositar', controller.realizarDeposito);

module.exports = router;
