var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var direccion_schema = new Schema({
    calle: String, 
    nInterior: String,
    nExterior: String, 
    colonia: String,
    municipio: String,
    estado: String,
    cPostal: String
});


var cliente_shecma=new Schema({
    nombre:String,
    telefono:String,
    email:String,
    empresa:String,
    rfc:String,
    direccion:direccion_schema,
    entrada:String
});

var Cliente=mongoose.model('Cliente',cliente_shecma);

module.exports=Cliente;