var controller=require('./cliente.controller');
var router=require('express').Router();


router.route('/')
.get(controller.verClientes)
.post(controller.agregar)

router.route('/:id')
.get(controller.verCliente)
.put(controller.modificar)
.delete(controller.eliminar)

router.get('/nombres/arreglo',controller.verNombres)


module.exports=router;