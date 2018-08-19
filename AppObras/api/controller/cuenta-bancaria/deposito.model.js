var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var depositoSchema = new Schema({
    concepto: String,
    monto: Number
},
{
  timestamps: true
});

module.exports = depositoSchema;