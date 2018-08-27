var router = require('express').Router;
var Usuario = require('./usuario.model');

var bcrypt = require('bcryptjs');
var Promise = require('bluebird');

Promise.promisifyAll(bcrypt);

exports.verUsuario = (req, res) => {
    Usuario.findById(req.usuario)
        .exec()
        .then((usuario) => {
            res.json(usuario);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

exports.registrarUsuario = (req, res) => {

    var usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        usuario: req.body.usuario,
        rol: req.body.rol,
        email: { email: req.body.email.email, password: req.body.email.pass }
    });

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync(req.body.pass, salt);
        }).then(function (password) {
            usuario.password = password
            return usuario.save()
        })
        .then((usuario) => {
            Usuario.find()
                .then((usuarios) => {
                    res.json({ mensaje: 'Usuario Registrado' ,usuarios:usuarios});
                })

            
        })
        .catch((err) => {
            res.status(500).json(err);
        })

}

exports.verVendedores = (req, res) => {
    Usuario.find({ rol: 'V' })
        .then((usuarios) => {
            res.json(usuarios);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


exports.getUsuario = (req, res) => {

    Usuario.findById(req.usuario)
        .then((usuario) => {
            res.json(usuario)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

exports.editarUsuario = (req, res) => {
    var correcto = true;

    Usuario.findById(req.params.id)
        .then((usuario) => {
            usuario.nombre = req.body.nombre;
            usuario.apellidos = req.body.apellidos;
            usuario.rol = req.body.rol
            usuario.firma = req.body.firma;
            
            usuario.email = {
                email: req.body.email.email,
                password: req.body.email.pass

            }
            if (req.body.pass) {
                bcrypt.genSaltAsync(10)
                    .then((salt) => {
                        return bcrypt.hashAsync(req.body.pass, salt);
                    }).then(function (password) {
                        usuario.password = password
                        return usuario.save()
                    })
                    .then((usuario) => {
                        Usuario.find()
                            .then((usuarios) => {
                                res.json({ mensaje: 'Usuario actualizado con éxito', usuarios: usuarios, pass: correcto })

                            })


                    })
            } else {
                correcto = false;
                return usuario.save()

                    .then((usuario) => {
                        Usuario.find()
                            .then((usuarios) => {
                                res.json({ mensaje: 'Usuario actualizado con éxito', usuarios: usuarios, pass: correcto })

                            })
                    })
            }
        })
}


exports.verUsuarios = (req, res) => {
    Usuario.find()
        .then((usuarios) => {
            res.json(usuarios);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


exports.verUsu = (req, res) => {
    Usuario.findById(req.params.id)
        .then((usuario) => {
            res.json(usuario)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}


exports.eliminar = (req, res) => {

    Usuario.findById(req.params.id)
        .then((usuario) => {
            return usuario.remove()
        })
        .then((usuario) => {
            Usuario.find()
                .then((usuarios) => {
                    res.json(usuarios);
                })
        })
}
