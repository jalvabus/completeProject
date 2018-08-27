var controller=require('./pieza.controller');
var router=require('express').Router();


router.route('/')
.get(controller.verNumeroPiezas)
.post(controller.agregarPieza)


router.route('/:id')
.get(controller.verPieza)
.put(controller.modificar)
.delete(controller.eliminar)

router.get('/piezas/obtener',controller.verPiezas)

module.exports=router;