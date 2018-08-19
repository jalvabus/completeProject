var express = require('express');
var router = express.Router();

var controller = require('./cuenta-bancaria.controller');

router.post('/', controller.registrarCuentaBancaria);
router.get('/', controller.verCuentasBancarias);
router.get('/:id', controller.verCuentaBancaria);
router.put('/:id', controller.modificarCuentaBancaria);
router.post('/:id/registrarDeposito/', controller.registrarDeposito);


module.exports = router;