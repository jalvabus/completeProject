var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var direccion_schema = new Schema({
    shipTo: String,
    invoice: String
});

var Direccion = mongoose.model('Direccion', direccion_schema);
module.exports = Direccion;