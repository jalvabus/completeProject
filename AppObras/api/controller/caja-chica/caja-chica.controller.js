var CajaChica = require('./caja-chica.model');

exports.realizarDeposito = (req, res) => {

    CajaChica.findById(req.params.id)
    .exec()
    .then((cajaChica)=>{
        cajaChica.depositos.push({
            monto: req.body.monto,
            fecha: new Date()
        });
        return cajaChica.save();
    })
    .then((cajaChica)=>{
        res.json(cajaChica);
    })

}

exports.realizarGasto = (req, res) => {

}

exports.obtenerCajaChica = (req, res) => {
    CajaChica.findOne({ administrador: "599dbdc948676c3eb3881d75" })
    .exec()
    .then((cajaChica)=>{

        res.json(cajaChica);
    })  
}