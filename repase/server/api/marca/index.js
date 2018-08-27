var controller=require('./marca.controller');
var router=require('express').Router();

router.route('/')
.post(controller.agregar)
.get(controller.verMarcas)
router.get('/nombres',controller.verNombres)

router.put('/:id',controller.modificar)
router.delete('/:id',controller.eliminar)

module.exports=router;