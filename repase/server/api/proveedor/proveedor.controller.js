var Proveedor = require('./proveedor.model');
var Marca = require('../marca/marca.model');

exports.agregar = (req, res) => {

    var proveedor = new Proveedor({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        idioma: req.body.idioma,
        iva: req.body.iva,
        pago: req.body.pago,
        comentario: req.body.comentario,
        paginaWeb: req.body.pagina,
        marcas: req.body.marcas,
        empresa: req.body.empresa,
        moneda: req.body.moneda
    })


    proveedor.save()
        .then((proveedor) => {
            req.body.marcas.forEach(function (marca) {
                Marca.findById(marca)
                    .then((marca) => {
                        marca.proveedores.push(proveedor._id)
                        marca.save()
                    })

            });
            return proveedor;
        })
        .then((proveedores) => {
            Proveedor.find()
                .then((proveedores) => {
                    res.json(proveedores)
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        })
        .catch((err) => {
            res.status(500).json(err);
        })

}

exports.verNombres = (req, res) => {
    Proveedor.find().distinct('nombre')
        .then((nombres) => {
            res.json(nombres)
        })
}

exports.verProveedor = (req, res) => {

    Proveedor.findById(req.params.id)
        .populate({ path: 'marca', model: 'Marca' })
        .then((proveedor) => {

            res.json(proveedor)
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

exports.verProveedores = (req, res) => {
    Proveedor.find().sort({'nombre': 1})
        .then((proveedores) => {
            res.json(proveedores)
        })
        .catch((err) => {
            res.status(500).json(err);
        })

}

exports.eliminar = (req, res) => {
    Proveedor.findById(req.params.id)
        .then((proveedor) => {
            return proveedor.delete()
        })
        .then((proveedor) => {
            res.json(proveedor);
        })
        .catch((err) => {
            res.status(500).json(err);
        })

}

exports.modificar = (req, res) => {
    Proveedor.findById(req.params.id)
        .then((proveedor) => {
            proveedor.nombre = req.body.nombre,
                proveedor.telefono = req.body.telefono,
                proveedor.email = req.body.email,
                proveedor.idioma = req.body.idioma,
                proveedor.iva = req.body.iva,
                proveedor.pago = req.body.pago
            proveedor.marcas = req.body.marcas;
            proveedor.empresa = req.body.empresa
            proveedor.moneda = req.body.moneda;

            return proveedor.save()

        })
        .then((proveedor) => {

            req.body.marcas.forEach(function (marca) { // iterar las marcas que vienen del request
                var agregar = false;
                Marca.findById(marca)
                    .then((marca) => {
                        if (marca.proveedores.indexOf(proveedor._id) === -1) { //verificar el proveedor no exista en las marcas, si no existe agregarlo
                            marca.proveedores.push(proveedor._id)
                            marca.save()
                        }
                    })


            });
            res.json({ sucess: true })

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

exports.verProveedoresXMarca = (req, res) => {
    var dato = {
        proveedores: []
    }
    Proveedor.find()
        .then((proveedores) => {
            proveedores.forEach(function (proveedor) {

                if (proveedor.marcas.indexOf(req.params.marca) !== -1) {
                    dato.proveedores.push(proveedor)

                }
            });
            return { dato }
        })
        .then((dato) => {
            res.json(dato)
        })

}

