var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', passport.authenticate('login', {
    successRedirect: '/obras',
    failureRedirect: '/auth/login'
}));

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/auth/login');
        }
    });
    console.log("Logout");
});

module.exports = router;