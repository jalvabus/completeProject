var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:31845/repase"); //31845
autoIncrement.initialize(connection);


var requisicion_schema = new Schema({
    fecha: Date,
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    etapa: Number,
    comentarios: String,
    entrada: String,
    piezas:[{type: Schema.Types.ObjectId, ref: 'PiezaRequisicion'}],
    lab:String,
    tiempoEntrega:String,
    subrequisicion: [{proveedor:{type:Schema.Types.ObjectId,ref:'Proveedor'},piezas:[{type:Schema.Types.ObjectId,ref:'PiezaRequisicion'}],envio:String,facturacion:String}],
    descuento:{type:Number, default:0},
    claveAcceso:String
});

requisicion_schema.plugin(autoIncrement.plugin, 'Requisicion');
var Requisicion = mongoose.model('Requisicion', requisicion_schema);
module.exports = Requisicion;