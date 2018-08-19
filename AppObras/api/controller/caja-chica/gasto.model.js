var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gasto_schema = new Schema({
    descripcion: String,
    cantidad: Number,
    precio: Number,
    total: Number,
    imagen: String,
    factura: String,
    fecha: Date
});

module.exports = gasto_schema;