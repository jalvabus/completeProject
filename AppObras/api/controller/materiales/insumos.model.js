var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insumos_schema = new Schema({
    insumo: String,
    importe: String 
});

var insumo = mongoose.model('Insumo', insumos_schema);

module.exports = insumo;