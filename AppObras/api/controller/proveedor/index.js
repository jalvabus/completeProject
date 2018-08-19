var express = require('express');
var router = express.Router();

var controller = require('./proveedor.controller');

router.get('/', controller.verProveedores);
router.post('/', controller.guardarProveedor);

router.get('/:id', controller.verProveedor);
router.put('/:id', controller.modificarProveedor);
router.delete('/:id', controller.eliminarProveedor);

module.exports = router;