var Gasto = require('./gasto.model');
var Obra = require('../obra/obra.model');
var CuentaBancaria = require('../cuenta-bancaria/cuenta-bancaria.model');

exports.registrarGasto = (req, res) => {

    var gasto = new Gasto({
        descripcion: req.body.descripcion,
        proveedor: req.body.proveedor,
        monto: req.body.monto,
        obra: req.body.obra._id,
        fecha: new Date()
    });
    var idCuenta = req.body.cuentaBancaria;
    gasto.save().then((respuesta) => {
        CuentaBancaria.findById(idCuenta).then((cuenta) => {
            cuenta.gastos.push(respuesta._id);
            cuenta.gasto.push({
                concepto: req.body.descripcion,
                proveedor: req.body.proveedor,
                monto: req.body.monto
            });
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
    console.log(req.body);
    var inicio = new Date(req.body.fecha_inicio);
    var fin = new Date(req.body.fecha_fin);
    fin.setDate(fin.getDate() + 1);

    Gasto.aggregate([
        {
            $match: { 
                createdAt: { $gt: inicio, $lt: fin },
                proveedor: req.body.proveedor,
                descripcion: req.body.material,
                obra: req.body.obra
            }
        }
    ], function (err, result) {
        console.log("Agregate");
        console.log(result);
        
    })

    Gasto.find(req.body).then((gastos) => {
        res.json(gastos);
    }).catch((err) => {
        console.log(err);
    })


    /*
    if (req.body.proveedor) {
        Gasto.find({
            proveedor: req.body.proveedor,
            descripcion: req.body.material,
            obra: req.body.obra,
            
        }).then((gastos) => {
            res.json(gastos);
        })
            .catch((err) => {
                console.log(err);
            })
    } else {
        Gasto.find({
            obra: req.body.obra,
            createdAt: { '$gte': req.body.fecha_inicio, '$lte': req.body.fecha_limite }
        }).then((gastos) => {
            res.json(gastos);
        })
            .catch((err) => {
                console.log(err);

            })
    }
    */

}

exports.registrarGastoCajaChica = (req, res) => {
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

exports.verGasto = (req, res) => {
    console.log(req.body);
    Gasto.find({
        obra: req.body.obra
    }).then((gastos) => {
        res.json(gastos);
    }).catch((err) => {
        console.log(err);
    })
}

exports.modificarGasto = (req, res) => {

}

exports.eliminarGasto = (req, res) => {

}