var bcrypt = require('bcryptjs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy, BearerStrategy = require('passport-http-bearer').Strategy;
var Promise = require('bluebird');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var sanitizer = require('sanitizer');

var Usuario = require('../api/usuario/usuario.model');

var jwt = require('jsonwebtoken')

Promise.promisifyAll(bcrypt);

const secret = 'ancient11251022017'

passport.use(new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    session: false
},
    function (usuarioTxt, passwordTxt, done) {
        usuarioTxt = sanitizer.sanitize(usuarioTxt);

        Usuario.findOne({ usuario: usuarioTxt })
            .exec()
            .then((usuario) => {

                if (!usuario) { return done(null, false) };
                bcrypt.compare(passwordTxt, usuario.password, function (err, isOk) {
                    isOk ? done(null, usuario) : done(null, false)
                })
            })
    }
));


passport.use(new BearerStrategy(function (token, cb) {
    jwt.verify(token, secret, function (err, decoded) {
        if (err) return cb(err);

        Usuario.findById(decoded)
            .then(usuario => usuario ? cb(null, usuario) : cb(null, false))
            .catch(err => cb(err))
    });
}));
passport.serializeUser(function (requisicion, done) {
    console.log(requisicion)
    done(null, requisicion._id);
});

passport.deserializeUser(function (id, done) {
    console.log(id)

    Requisicion.findById(id)
        .then((requisicion) => {
            if (!requisicion)
                done(null, false);
            done(null, requisicion);
        })
        .catch((err) => {
            done(err);
        });
});
passport.use('validarClave', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    session: false
},
    function (usuario, clave, done) {
        console.log(clave)
        Requisicion.findOne({ claveAcceso: clave }, function (err, requisicion) {
            if (err) { return done(err); }
            if (!requisicion) { return done(null, false); }
            else { return done(null, requisicion); }

        });
    }
));


module.exports = passport;