var Obra = require('./obra.model');
var Concepto = require('../concepto/concepto.model');
var Proveedor = require('../proveedor/proveedor.model');
var CuentaBancaria = require('../cuenta-bancaria/cuenta-bancaria.model');
var CajaChica = require('../caja-chica/caja-chica.model');

var Insumo = require('../materiales/insumos.model');

var fs = require('fs');
var XLSX = require('xlsx');
var path = require('path');

exports.verTodas = (req, res) => {
    var query = Obra.find().populate({
        path: 'gastos',
        model: 'Gasto'/*,
        populate: [{
            path: 'concepto',
            model: 'Concepto'
        }, {
            path: 'proveedor',
            model: 'Proveedor'
        }]*/
    }).populate({
        path: 'estimaciones.cuentaBancaria',
        model: 'CuentaBancaria',
        populate: {
            path: 'cuentaBancaria.gastos',
            model: 'Gasto'
        }
    })
        .populate({
            path: 'caja_chica',
            model: 'CajaChica'
        })
        .populate({
            path: 'administrador',
            model: 'Usuario'
        });
    query.exec().then((obras) => {
        res.json(obras);
    });
}

exports.registrarObra = (req, res) => {

    var cajaChica = new CajaChica({
        administrador: req.body.administrador
    });

    cajaChica.save()
        .then((cajaChicaGuardada) => {
            var obra = new Obra({
                nombre: req.body.nombre,
                precio_contrato: req.body.precio_contrato,
                volumetria: req.body.volumetria,
                fecha_inicio: new Date(req.body.fecha_inicio),
                fecha_limite: new Date(req.body.fecha_limite),
                porcentaje_anticipo: req.body.porcentaje_anticipo,
                direccion: req.body.direccion,
                cuentaBancaria: req.body.cuentaBancaria,
                administrador: req.body.administrador,
                caja_chica: cajaChicaGuardada._id
            });

            return obra.save();
        })
        .then((obra) => {

            if (req.files) {
                req.files.forEach((file) => {
                    var filename = file.originalname;
                    fs.rename(file.path, "uploads/" + filename, (err) => {
                        if (err) throw err;

                        var workbook = XLSX.readFile(path.join(__dirname, '../../../uploads/' + filename))
                        var sheet_name_list = workbook.SheetNames;
                        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

                        var insumos = [];

                        xlData.forEach(function (data, i) {

                            insumos.push({
                                insumo: data.Material,
                                importe: data.Importe
                            });

                            obra.insumos.push({
                                insumo: data.Material,
                                importe: data.Importe
                            });

                            if (i == (xlData.length - 1)) {
                                Insumo.collection.insert(insumos, (err, insertado) => {
                                    if (err) {
                                        return console.error(err);
                                    } else {
                                        console.log("Multiple documents inserted to Collection");
                                    }
                                })
                                obra.save();
                                res.json(obra);
                            }
                        })
                    })
                })
            }
        });


}

exports.pagarAnticipo = (req, res) => {

    var query = Obra.findById(req.params.idObra);

    query.exec().then((obra) => {

        obra.anticipoPagado = true;

        return obra.save();

    }).then((obra) => {
        CuentaBancaria.findById(obra.cuentaBancaria).exec()
            .then((cuentaBancaria) => {
                cuentaBancaria.depositos.push({
                    concepto: 'Anticipo: ' + obra.nombre,
                    monto: obra.precio_contrato * (obra.porcentaje_anticipo / 100)
                });

                cuentaBancaria.save().then((cuentaBancariaGuardada) => {
                    res.json(obra);
                })
            });

    })


}

exports.obtenerObra = (req, res) => {
    var query = Obra.findById(req.params.id)
        .populate({
            path: 'gastos',
            model: 'Gasto'
        })
        .populate({
            path: 'estimaciones.cuentaBancaria',
            model: 'CuentaBancaria',
            populate: {
                path: 'cuentaBancaria.gastos',
                model: 'Gasto'
            }
        })
        .populate({
            path: 'caja_chica',
            model: 'CajaChica'
        })
        .populate({
            path: 'administrador',
            model: 'Usuario'
        })

    query.exec().then((obra) => {
        res.json(obra);
    });
}

exports.modificarObra = (req, res) => {
    var query = Obra.findById(req.params.id);
    query.exec().then((obra) => {
        obra.nombre = req.body.nombre,
            obra.precio_contrato = req.body.precio_contrato,
            obra.volumetria = req.body.volumetria,
            obra.fecha_limite = req.body.fecha_limite,
            obra.porcentaje_anticipo = req.body.porcentaje_anticipo,
            obra.lugar = req.body.lugar

        obra.save().then((saved) => {
            res.json(saved);
        });
    });
}

exports.eliminarObra = (req, res) => {
    var query = Obra.findById(req.params.id);
    query.exec().then((obra) => {

    });
}

exports.registrarEstimacion = (req, res) => {
    var idObra = req.params.id;
    var query = Obra.findById(idObra);

    query.exec().then((obra) => {
        obra.estimaciones.push({
            nombre: req.body.nombre,
            monto: req.body.monto,
            conceptos_extras: req.body.conceptos_extras,
            monto_conceptos_extras: req.body.monto_conceptos_extras,
            amortizacion_anticipo: req.body.amortizacion_anticipo,
            fondo_garantia: req.body.fondo_garantia,
            subtotal: req.body.subtotal,
            iva: req.body.iva,
            total: req.body.total,
            fecha_inicio: req.body.fecha_inicio,
            fecha_limite: req.body.fecha_limite,
            cuentaBancaria: req.body.cuentaBancaria
        });

        obra.save().then((obraRespuesta) => {

            res.json(obraRespuesta);
        })

    })

}

exports.pagarEstimacion = (req, res) => {

    var idObra = req.params.idObra;
    var idEstimacion = req.params.idEstimacion;

    var query = Obra.findById(idObra);

    query.exec().then((obra) => {

        var estimacion = obra.estimaciones.id(idEstimacion);

        estimacion.pagado = true;

        return obra.save();

    }).then((obra) => {

        var estimacion = obra.estimaciones.id(idEstimacion);

        CuentaBancaria.findById(estimacion.cuentaBancaria).exec()
            .then((cuentaBancaria) => {
                var estimacionesLong = obra.estimaciones.length;
                cuentaBancaria.depositos.push({
                    concepto: 'Estimación No. ' + (+estimacionesLong) + ' ' + obra.nombre,
                    monto: estimacion.total
                });

                cuentaBancaria.save().then((cuentaBancariaGuardada) => {
                    res.json(cuentaBancariaGuardada);
                })
            });
    })

}

exports.recuperarEstimacion = (req, res) => {
    Obra.findById(req.params.idObra)
        .exec()
        .then((obra) => {
            var estimacion = obra.estimaciones.id(req.params.idEstimacion);
            res.json(estimacion);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}