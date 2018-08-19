var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Usuario = require('../../controller/user/model');

var localConfig = (server) => {
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        function (username, password, done) {
            console.log(username);
            console.log(password);
            Usuario.findOne({ username: username, password: password })
                .then((user) => {
                    if (!user) return done(null, false);
                    if (user.password === password) return done(null, user);
                    done(null, false);

                    /*
                        bcrypt.compare(passwordTxt, vendedor.password, function (err, isOk) {
                            if (!isOK) return res.json({ mensaje: "Contraseña incorrecta" });
                             res.json({ mensaje: "Usuario logueado", usuario: username });
                        })
                        */
                })
        }
    ));

    server.post('/login', passport.authenticate('local', {
        successRedirect: '/ingresar',
        failureedirect: '/login'
    }))
};

module.exports = localConfig;