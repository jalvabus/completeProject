var Marca = require('./marca.model');
var Pieza = require('../pieza/pieza.model');

exports.agregar = (req, res) => {
    Marca.findOne({ nombre: req.body.marca.toUpperCase() })
        .then((marca) => {
            if (!marca) {
                var marca = new Marca({
                    nombre: req.body.marca.toUpperCase()
                })
                marca.save()
                    .then(() => {
                        Marca.find()
                            .then((marcas) => {

                                res.json({ marcas: marcas, msg: true })
                            })
                    })
            } else {
                res.json({ msg: false })
            }
        })



}

exports.verMarcas = (req, res) => {
    Marca.find()
        .then((marcas) => {
            var ordenado = marcas.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            res.json(ordenado)
        })
}


exports.modificar = (req, res) => {

    Marca.findById(req.body._id)
        .then((marca) => {
            marca.nombre = req.body.nombre;
            return marca.save()
        })
        .then((marca) => {
            Marca.find()
                .then((marcas) => {
                    res.json(marcas)
                })
        })

}

exports.verNombres = (req, res) => {
    Marca.find().distinct('nombre')
        .then((marcas) => {
            res.json(marcas)
        })
}

exports.eliminar = (req, res) => {
    idMarcaDesconocida = '';
    Marca.findOne({ nombre: 'DESCONOCIDA' })
        .then((marca) => {
            if (marca) {
                idMarcaDesconocida = marca._id;
            } else {
                var newMarca = Marca({
                    nombre: 'DESCONOCIDA'
                })
                return marca.save()

            }
        })
        .then((marca) => {
            idMarcaDesconocida = marca._id;
        })


    Marca.findById(req.params.id)
        .then((marca) => {
            
           return marca.remove();

        })
        .then((marca)=>{
            return Pieza.find({ marca: marca._id })
        })
        .then((piezas) => {
            console.log(piezas)
            piezas.forEach(pieza => {
                pieza.marca = idMarcaDesconocida;
                pieza.save()

            });
        })
        .then(() => {
            Marca.find()
                .then((marcas) => {
                    res.json(marcas)
                })
        })

}

