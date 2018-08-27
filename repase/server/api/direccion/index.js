var router=require('express').Router();
var controller=require('./direccion.controller');

router.post('/', controller.agregar)
router.get('/',controller.verDirecciones)

router.route('/:id')
.delete(controller.eliminar)
.put(controller.actualizar)
.get(controller.verDireccion)

router.get('/ship',controller.verShipTo)
router.get('/invoice',controller.verInvoice)

module.exports=router;