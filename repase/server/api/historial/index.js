var controller=require('./historial.controller');
var router=require('express').Router();

router.route('/')
.post(controller.registrar)
.get(controller.verPiezas)

router.get('/:nombre',controller.verificarExistencia)


module.exports=router;
