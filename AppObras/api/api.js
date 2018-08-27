var express = require('express');
var router = express.Router();

router.use('/obra/', require('./controller/obra'));
router.use('/concepto/', require('./controller/concepto'));
router.use('/proveedor/', require('./controller/proveedor'));
router.use('/gasto/', require('./controller/gasto'));
router.use('/cuentaBancaria/', require('./controller/cuenta-bancaria'));
router.use('/usuario/', require('./controller/usuario'));
router.use('/caja-chica/', require('./controller/caja-chica'));
router.use('/insumo/', require('./controller/materiales'));

module.exports = router;