var router=require('express').Router();
var controller=require('./reportesAdmin.controller');

router.get('/reqVendedorFinalizadas',controller.requisicionesXVendedorFinalizadas)
router.get('/clienteFrecuente',controller.clienteFrecuente)
router.get('/proveedorFrecuente',controller.proveedorFrecuente)
router.get('/estadoCliente',controller.estadoCliente);
router.get('/piezaMasVendida',controller.piezaMasVendida);
router.get('/statusPiezaReq',controller.statusPiezaReq)

router.post('/clienteFrecuenteP',controller.clienteFrecuenteXFecha);
router.post('/proveedorFrecuenteP',controller.proveedorFrecuenteXFecha);
router.post('/piezaMasVendidaP',controller.piezaMasVendidaXFecha);
router.post('/reqVendedorFinalizadasP',controller.requisicionesXVendedorFinalizadasXFecha)

router.post('/reqVendedor',controller.requisicionesXVendedor)
router.post('/entradaCliente',controller.entradaCliente);
router.post('/piezaMasCotizada',controller.piezaMasCotizada);
router.post('/etapa',controller.PasosRequisiciones)

module.exports=router;