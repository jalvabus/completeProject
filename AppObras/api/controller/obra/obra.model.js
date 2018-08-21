var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var estimacion_schema = require('./estimacion.model');

var obra_schema = new Schema({
    nombre: String,
    precio_contrato: String,
    volumetria: Number,
    fecha_inicio: Date,
    fecha_limite: Date,
    porcentaje_anticipo: Number,
    direccion: String,
    gastos:[{ type: Schema.Types.ObjectId, ref: 'Gasto' }],
    estimaciones: [estimacion_schema],
    cuentaBancaria: { type: Schema.Types.ObjectId, ref: 'CuentaBancaria' },
    anticipoPagado: { type: Boolean, default: false},
    administrador: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    caja_chica: { type: Schema.Types.ObjectId, ref: 'CajaChica' },
    insumos: [{insumo : String , importe: Number}]    
});

var Obra = mongoose.model('Obra', obra_schema);

module.exports = Obra;