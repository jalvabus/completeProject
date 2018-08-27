var Pieza = require('./pieza.model');
var Marca = require('../marca/marca.model');


exports.agregarPieza = (req, res) => {
    console.log(req.body)

    Marca.findOne({ nombre: req.body.marca.toUpperCase() })
        .then((marca) => {

            if (!marca) {
                var marca = new Marca({
                    nombre: req.body.marca.toUpperCase()
                })
                marca.save()
                    .then((marca) => {

                        var pieza = new Pieza({
                            noPieza: req.body.noPieza,
                            marca: marca._id,
                            modelo: req.body.modelo,
                            descripcion: req.body.descripcion
                        });

                        pieza.save()
                            .then((pieza) => {
                                Pieza.find({"deletedAt" : { "$exists" : false }})
                                    .populate({ path: 'marca', ref: 'Marca' })
                                    .then((piezas) => {

                                        res.json(piezas)
                                    })
                            })
                            .catch((err) => {
                                res.status(500).json(err);
                            })
                    })
            } else {

                var pieza = new Pieza({
                    noPieza: req.body.noPieza,
                    marca: marca._id,
                    modelo: req.body.modelo,
                    descripcion: req.body.descripcion
                });

                pieza.save()
                    .then((pieza) => {
                        Pieza.find({"deletedAt" : { "$exists" : false }})
                            .populate({ path: 'marca', ref: 'Marca' })
                            .then((piezas) => {

                                res.json(piezas)
                            }).catch((err) => {
                                res.status(500).json(err);
                            })
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    })
            }
        })



}

exports.verPieza = (req, res) => {
    Pieza.findById(req.params.id)
        .populate({ path: 'marca', ref: 'Marca' })
        .then((pieza) => {
            console.log(pieza)
            res.json(pieza)
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


exports.verNumeroPiezas = (req, res) => {
    Pieza.find({"deletedAt" : { "$exists" : false }}).distinct('noPieza')
        .then((piezas) => {
            res.json(piezas)

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

exports.verPiezas = (req, res) => {
    Pieza.find({"deletedAt" : { "$exists" : false }})
        .populate({ path: 'marca', ref: 'Marca' })
        .then((marcas) => {
            res.json(marcas)
        }).catch((err) => {
            res.status(500).json(err);
        })
}

exports.modificar = (req, res) => {
    var idMarca = '';
    Marca.findOne({ nombre: req.body.marca })
        .then((marca) => {
            idMarca = marca._id;
        })
    Pieza.findById(req.params.id)
        .then((pieza) => {
            pieza.noPieza = req.body.noPieza,
                pieza.marca = idMarca,
                pieza.modelo = req.body.modelo,
                pieza.descripcion = req.body.descripcion

            return pieza.save();
        })
        .then((pieza) => {
            Pieza.find({"deletedAt" : { "$exists" : false }})
                .populate({ path: 'marca', ref: 'Marca' })
                .then((marcas) => {
                    res.json(marcas)
                })

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


exports.eliminar = (req, res) => {
    Pieza.findById(req.params.id)
        .then((pieza) => {
            pieza.deletedAt=new Date();
            return pieza.save()
        })
        .then((pieza) => {
            
            Pieza.find({"deletedAt" : { "$exists" : false }})
                .populate({ path: 'marca', ref: 'Marca' })
                .then((marcas) => {
                    res.json(marcas)
                })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}