var express = require('express');
var router = express.Router();
var controller = require('./usuario.controller');

router.post('/', controller.registrarAdministrador);
router.get('/', controller.verAdministradores);
router.get('/getUsuario', controller.getUsuario);

module.exports = router;
