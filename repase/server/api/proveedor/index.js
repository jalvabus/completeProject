var router=require('express').Router();
var controller=require('./proveedor.controller');

router.route('/')
.get(controller.verProveedores)
.post(controller.agregar)


router.route('/:id')
.get(controller.verProveedor)
.put(controller.modificar)
.delete(controller.eliminar)

router.route('/obtener/nombres')
.get(controller.verNombres);
router.get('/marca/:marca',controller.verProveedoresXMarca);

module.exports=router;