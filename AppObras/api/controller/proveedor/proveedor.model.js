var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proveedor_schema = new Schema({
    nombre: String
});

var Proveedor =  mongoose.model('Proveedor', proveedor_schema);
module.exports = Proveedor;