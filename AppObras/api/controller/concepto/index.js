var express = require('express');
var router = express.Router();

var controller = require('./concepto.controller');

router.get('/', controller.verConceptos);
router.post('/', controller.registrarConcepto);

router.get('/:id', controller.verConcepto);
router.put('/:id', controller.modificarConcepto);
router.delete('/:id', controller.eliminarConcepto);

module.exports = router;