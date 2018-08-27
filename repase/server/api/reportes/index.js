var controller=require('./reportes.controller');
var router=require('express').Router();

router.get('/envioCP/:idRequisicion/:idMarca/:proveedores/:comentarios',controller.enviarCotizacionProveedor)

router.get('/:idRequisicion/:monedas',controller.enviarCotizacionCliente);
router.get('/ordenCliente/:idRequisicion/:monedas',controller.ordenCompraCliente);
router.get('/visualizar/cotizacion/cliente/:idRequisicion/:moneda',controller.visualizarCotizacionCliente)
router.get('/visualizarOrdenC/:idRequisicion/:moneda',controller.visualizarOrdenCompraCliente)
router.post('/ordenCompra',controller.ordenCompraProveedor)
router.get('/visualizarOrdenP/:sub/:id',controller.visualizarOrdenProveedor)

module.exports=router;