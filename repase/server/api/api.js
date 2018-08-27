var router=require('express').Router();
var passport = require('./../config/auth');




router.all('*', function(req, res, next) {
    
        passport.authenticate('bearer', function(err, usuario) {
          if (err) return next(err);
          if (usuario) {
            req.usuario = usuario;
            return next();
          } else {
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
          }
        })(req, res, next);
      });
router.use('/pieza',require('./pieza'));

router.use('/reportesAdmin',require('./reportesAdmin'));
router.use('/cliente',require('./cliente'));
router.use('/proveedor',require('./proveedor'));
router.use('/direccion',require('./direccion'));
router.use('/requisicion',require('./requisicion'));

router.use('/historial',require('./historial'));
router.use('/usuario',require('./usuario'));
router.use('/marca',require('./marca'))

module.exports=router;