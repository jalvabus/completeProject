var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deposito_schema = require('./deposito.model');
var gasto_schema = require('./gasto.model');

var caja_chica_schema = new Schema({
    administrador: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    depositos: [deposito_schema],
    gastos: [gasto_schema]
});

var CajaChica = mongoose.model('CajaChica', caja_chica_schema);
module.exports = CajaChica;
