var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre : String,
    apellido: String,
    username: String,
    password: String
});

module.exports = mongoose.model('usuario', userSchema);