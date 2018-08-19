var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var depositoSchema = require('./deposito.model');

var cuentaBancariaSchema = new Schema({
    noCuenta: String,
    banco: String,
    depositos: [depositoSchema],
    gastos: [{ type: Schema.Types.ObjectId, ref: 'Gasto' }]
},
    {
        timestamps: true
    });

var CuentaBancaria = mongoose.model('CuentaBancaria', cuentaBancariaSchema);

module.exports = CuentaBancaria;