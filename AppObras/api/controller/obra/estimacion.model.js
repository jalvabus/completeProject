var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estimacion_schema = new Schema({
    nombre: String,
    monto: Number,
    conceptos_extras:  {type: Number, default: 0},
    monto_conceptos_extras: {type: Number, default: 0},
    amortizacion_anticipo: Number, 
    fondo_garantia: Number,
    subtotal: Number,
    iva: Number,
    total: Number,
    fecha_inicio: Date,
    fecha_limite: Date,
    cuentaBancaria: { type: Schema.Types.ObjectId, ref: 'CuentaBancaria' },
    pagado: { type: Boolean, default: false}
});

module.exports = estimacion_schema;