var passport = require('passport');

var passportConfig = (server) => {
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user); // req.user
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    require('./local.js')(server);
}

module.exports = passportConfig;