var controller=require('./usuario.controller');
var router=require('express').Router();

router.route('/')
.get(controller.verUsuario)
.post(controller.registrarUsuario)
router.get('/vendedor',controller.verVendedores);
router.get('/fetchUsuario',controller.getUsuario)
router.get('/vertodos',controller.verUsuarios)

router.route('/:id')
.put(controller.editarUsuario)
.get(controller.verUsu)
.delete(controller.eliminar)
module.exports=router;