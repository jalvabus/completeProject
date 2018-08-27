var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gasto_schema = new Schema({
    descripcion: String,
    fecha: Date, 
    proveedor: String,
    monto: Number,
    obra: { type: Schema.Types.ObjectId, ref: 'Obra' },
    fecha: Date
},
{
  timestamps: true
});

var Gasto = mongoose.model('Gasto', gasto_schema);

module.exports = Gasto;