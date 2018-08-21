var Gasto = require('./gasto.model');
var Obra = require('../obra/obra.model');
var CuentaBancaria = require('../cuenta-bancaria/cuenta-bancaria.model');

exports.registrarGasto = (req, res) => {
    console.log(req.body);
    
    var gasto = new Gasto({
        descripcion: req.body.descripcion,
        proveedor: req.body.proveedor,
        monto: req.body.monto,
        obra: req.body.obra._id
    });
    var idCuenta = req.body.cuentaBancaria;
    gasto.save().then((respuesta) => {
        CuentaBancaria.findById(idCuenta).then((cuenta) => {
            cuenta.gastos.push(respuesta._id);
            return cuenta.save()
        }).then((cuentaRespuesta) => {
            if (gasto.obra) {
                var query = Obra.findById(gasto.obra);
                query.exec().then((obra) => {
                    obra.gastos.push(gasto._id);
                    obra.save().then((respuesta) => {
                        res.json(respuesta);
                    });
                })
            } else {
                res.json(respuesta);
            }

        })
    });
    
}

exports.verReporte = (req, res) => {
    if(req.body.proveedor){
        Gasto.find({
            obra: req.body.obra,
            proveedor: req.body.proveedor,
            createdAt:  { '$gte': req.body.fecha_inicio, '$lte': req.body.fecha_limite }
        }).then((gastos)=>{
            res.json(gastos);
        })
        .catch((err)=>{
            console.log(err);           
        })
    }else{
        Gasto.find({
            obra: req.body.obra,
            createdAt:  { '$gte': req.body.fecha_inicio, '$lte': req.body.fecha_limite }
        }).then((gastos)=>{
            res.json(gastos);
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

}

exports.verGasto = (req, res) => {

}

exports.modificarGasto = (req, res) => {

}

exports.eliminarGasto = (req, res) => {

}