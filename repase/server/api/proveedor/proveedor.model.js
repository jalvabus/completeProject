var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proveedor_schema = new Schema({
    nombre: String, 
    telefono: String,
    email: String,
    idioma: String,
    iva: Boolean,
    pago: String,
    comentario:String,
    calificacion:Number,
    empresa:String,
    piezas:[{type:Schema.Types.ObjectId,ref:'Pieza'}],
    paginaWeb:String,
    marcas:[{type: Schema.Types.ObjectId, ref: 'Marca'}],
    moneda:String // Euro, Peso, Dollar,
});

var Proveedor = mongoose.model('Proveedor', proveedor_schema);

module.exports = Proveedor;

