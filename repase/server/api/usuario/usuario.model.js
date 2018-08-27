var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    nombre: String,
    apellidos: String,
    usuario: String,
    password: String,
    rol: String,  // V vendedor    A admin       C  capturista
    email: {email:String,password:String},
    firma: String
});

var Usuario = mongoose.model('Usuario', usuario_schema); 
module.exports = Usuario;




