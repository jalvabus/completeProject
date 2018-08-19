var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deposito_schema = new Schema({
    monto: Number,
    fecha: Date
});

module.exports = deposito_schema;