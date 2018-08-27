var Cliente = require('./cliente.model');


exports.agregar = (req, res) => {
    var cliente = new Cliente({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        empresa: req.body.empresa,
        rfc: req.body.rfc,
        entrada: req.body.entrada,
        direccion: {
            calle: req.body.direccion.calle,
            nInterior: req.body.direccion.nInterior,
            nExterior: req.body.direccion.nExterior,
            colonia: req.body.direccion.colonia,
            municipio: req.body.direccion.municipio,
            estado: req.body.direccion.estado,
            cPostal: req.body.direccion.cPostal,
        }
    })


    cliente.save()
        .then((cliente) => {
            Cliente.find()
                .then((clientes) => {

                    res.json(clientes)

                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

exports.verCliente = (req, res) => {
    Cliente.findById(req.params.id)
        .then((cliente) => {
            res.json(cliente)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

exports.verNombres = (req, res) => {
    Cliente.find().distinct('nombre')
        .then((clientes) => {

            res.json(clientes)

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}
exports.verClientes = (req, res) => {
    Cliente.find().sort({'nombre': -1})
        .then((clientes) => {

            res.json(clientes)

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

exports.eliminar = (req, res) => {
    console.log(req.params)
    Cliente.findById(req.params.id)
        .then((cliente) => {
            return cliente.remove()
        })
        .then((cliente) => {

            Cliente.find()
                .then((clientes) => {
                    res.json(clientes)

                })
        })
        .catch((err) => {
            res.status(500).json(err)
        })

}

exports.modificar = (req, res) => {
    Cliente.findById(req.params.id)
        .then((cliente) => {
            cliente.nombre = req.body.nombre,
                cliente.telefono = req.body.telefono,
                cliente.email = req.body.email,
                cliente.empresa = req.body.empresa,
                cliente.rfc = req.body.rfc,
                cliente.entrada = req.body.entrada,
                cliente.direccion.calle = req.body.direccion.calle,
                cliente.direccion.nInterior = req.body.direccion.nInterior,
                cliente.direccion.nExterior = req.body.direccion.nExterior,
                cliente.direccion.colonia = req.body.direccion.colonia,
                cliente.direccion.municipio = req.body.direccion.municipio,
                cliente.direccion.estado = req.body.direccion.estado,
                cliente.direccion.cPostal = req.body.direccion.cPostal

            return cliente.save();
        })
        .then((cliente) => {
            res.json({ cliente: cliente, msj: 'Cliente actualizado' });
        })
        .catch((err) => {
            res.status(500).json(err)
        })


}