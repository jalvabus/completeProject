var Usuario = require('./usuario.model');
var bcrypt = require('bcryptjs');

var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);

exports.registrarAdministrador = (req, res) => {
    var usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo_electronico: req.body.correo_electronico,
        usuario: req.body.usuario,
        rol: req.body.rol
    });

    bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hashSync(req.body.password, salt)
        }).then((password) => {
            usuario.password = password;
            return usuario.save();
        }).then((respuesta) => {
            res.json(respuesta);
        })
}

exports.verAdministradores = (req, res) => {
    /*
    Usuario.find({ rol: 'admin' })
        .exec()
        .then((usuarios) => {
            res.json({usuarios : usuarios});
        })
        */

    Usuario.find()
        .exec()
        .then((usuarios) => {
            res.json({ usuarios: usuarios });
        })
}

exports.getUsuario = (req, res) => {

}