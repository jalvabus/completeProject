var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var concepto_schema = new Schema({
    nombre: String
});

var Concepto = mongoose.model('Concepto', concepto_schema);

module.exports = Concepto;