var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var piezaRequisicion=new Schema({
    pieza:{type: Schema.Types.ObjectId, ref: 'Pieza'},
    cantidad:Number,
    precioPublico:Number,
    precioProveedor:Number,
    precioUnitarioProveedor:Number,
    precioUnitarioCliente:Number,
    porcentaje:Number,
    proveedor: {type: Schema.Types.ObjectId, ref: 'Proveedor'},
    descuento: Number,
    moneda:String,
    tiempoEntrega:String,
    paqueteria:String,
    guia:String,
    status:String,
    comentarios:String,
    activada:Boolean
    
})

var piezaRequisicion=mongoose.model('PiezaRequisicion',piezaRequisicion)
module.exports=piezaRequisicion