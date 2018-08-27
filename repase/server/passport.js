var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Requisicion = require('./api/requisicion/requisicion.model');

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
passport.use('validarClave',new LocalStrategy(
    function (clave, password, done) {
        Requisicion.findOne({ claveAcceso: clave }, function (err, requisicion) {
            if (err) { return done(err); }
            if (!requisicion) { return done(null, false); }
            else{return done(null, requisicion);}
            
        });
    }
));


module.exports = passport;
