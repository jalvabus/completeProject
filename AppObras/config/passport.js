// Autenticar el usuario
// Requiere 1 serializar el objeto, 2 deserializar y 3 comparar

var localStrategy = require('passport-local').Strategy;
var bcryptjs = require('bcryptjs');
var Usuario = require('../api/controller/usuario/usuario.model');

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use('login', new localStrategy({
        usernameField: 'usuario',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, usuario, password, done) {
        console.log("Ingresando Login");
        Usuario.findOne({ usuario: usuario }).exec().then((user) => {
            console.log(user);
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }

            // Return if password is wrong
            /*
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            */
            // If credentials are correct, return the user object
            
            return done(null, user);

        });

    }))
}
