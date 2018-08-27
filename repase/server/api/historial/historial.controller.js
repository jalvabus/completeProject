var Historial = require('./historial.model');
var Pieza = require('../pieza/pieza.model');
var Proveedor = require('../proveedor/proveedor.model');

exports.registrar = (req, res) => {

    Pieza.findOne({ noPieza: req.body.noPieza })
        .then((pieza) => {
            Historial.findOne({ pieza: pieza._id })
                .then((historial) => {
                    if (!historial) {
                        Proveedor.findOne({ nombre: req.body.proveedor })
                            .then((proveedor) => {

                                var historial = new Historial({
                                    pieza: pieza._id,
                                    proveedor: proveedor._id,
                                    descripcion: req.body.descripcion,
                                    anio: req.body.anio,
                                    precio: req.body.precio
                                })
                                historial.save()
                                    .then((historial) => {
                                        Historial.find()
                                            .populate({ path: 'proveedor', model: 'Proveedor' })
                                            .populate({ path: 'pieza', model: 'Pieza' })
                                            .then((piezas) => {
                                                res.json(piezas)
                                            })
                                    })


                            })
                    } else {
                        Proveedor.findOne({ nombre: req.body.proveedor })
                            .then((proveedor) => {


                                historial.precio = req.body.precio;
                                historial.anio = req.body.anio;
                                historial.proveedor = proveedor._id;
                                historial.descripcion = req.body.descripcion

                                return historial.save()
                                    .then((historial) => {
                                        Historial.find()
                                            .populate({ path: 'proveedor', model: 'Proveedor' })
                                            .populate({ path: 'pieza', model: 'Pieza' })
                                            .then((piezas) => {
                                                res.json(piezas)
                                            })
                                    })
                            })
                    }
                })





        })


}


exports.verPiezas = (req, res) => {
    Historial.find()
        .populate({ path: 'proveedor', model: 'Proveedor' })
        .populate({ path: 'pieza', model: 'Pieza' })
        .then((piezas) => {
            res.json(piezas)
        })
        .catch((err) => {
            console.log(err)
        })
}


exports.verificarExistencia = (req, res) => {
    
    Pieza.findOne({ noPieza: req.params.nombre })
        .then((pieza) => {
            Historial.findOne({ pieza: pieza._id })
                .then((historial) => {
                
                    if (historial) {
                        res.json({ existe: true })
                    } else {
                        res.json({ existe: false })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
        }).catch((err)=>{
            console.log(err)
        })
}