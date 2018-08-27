var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gastoSchema = new Schema({
    concepto: String,
    monto: Number,
    proveedor: String
},
{
  timestamps: true
});

module.exports = gastoSchema;