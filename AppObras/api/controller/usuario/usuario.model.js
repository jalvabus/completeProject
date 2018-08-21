var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    nombre: String,
    apellidos: String,
    rol: String,
    correo_electronico: String,
    usuario: String,
    password: String,
    rol: String
});

var Usuario = mongoose.model('Usuario', usuario_schema);
module.exports = Usuario;