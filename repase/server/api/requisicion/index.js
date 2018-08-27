var controller = require('./requisicion.controller');
var router = require('express').Router();

router.route('/')
    .get(controller.verRequisicionesXVendedor)
    .post(controller.agregar)
    .put(controller.modificarPiezaRequisicion)

router.route('/:id')
    .get(controller.verRequisicion)
    .put(controller.modificarRequisicion)
    .delete(controller.borrar)


router.put('/eliminarPieza/:id/', controller.eliminarPieza)
router.get('/piezas/:idRequisicion/:idMarca/:proveedores', controller.verPiezasXMarca);
router.put('/etapa/actualizar', controller.actualizarEtapa);
router.get('/capturista/requisiciones', controller.verRequisiciones)

router.route('/actualizar/status')
    .put(controller.statusPieza)

router.put('/actualizar/sub', controller.actualizarSubrequisicion)
router.post('/enviar/:id', controller.enviarStatus)

router.route('/historial/:idProveedor/:idPieza')
    .get(controller.verificarHistorial)

router.route('/historial/precio')
    .get(controller.verHistorialPieza);


module.exports = router;