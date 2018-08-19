var Usuario = require('./model');
var bcrypt = require('bcryptjs');

function createUser(req, res) {

    var user = new Usuario(req.body);

    bcrypt.genSaltAsync(10)
        .then((salt) => {
            return bcrypt.hashAsync(req.body.pass, salt);
        }).then(function (password) {
            user.password = password
            return usuario.save()
        })
        .then((user) => {
            Usuario.find()
                .then((usuarios) => {
                    res.json({ mensaje: 'Usuario Registrado', usuarios: usuarios });
                })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports = {
    createUser
};