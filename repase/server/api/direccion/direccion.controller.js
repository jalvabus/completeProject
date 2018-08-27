var Direccion = require('./direccion.model');

exports.agregar = (req, res) => {
    var direccion = new Direccion({
        shipTo: req.body.shipTo,
        invoice: req.body.invoice
    })

    direccion.save()
        .then((direccion) => {
            return Direccion.find()
        })
        .then((direcciones) => {
            res.json(direcciones);
        })
}

exports.eliminar = (req, res) => {
    Direccion.findById(req.params.id)
        .then((direccion) => {
            return direccion.remove()
        })
        .then(() => {
            return Direccion.find()
        })
        .then((direcciones) => {
            res.json(direcciones);
        })
}

exports.actualizar = (req, res) => {
    Direccion.findById(req.params.id)
        .then((direccion) => {
            direccion.shipTo = req.body.shipTo,
                direccion.invoice = req.body.invoice
            return direccion.save();
        })

        .then((direccion) => {
            return Direccion.find()
        })
        .then((direcciones) => {
            res.json(direcciones);
        })
}

exports.verDireccion = (req, res) => {
    Direccion.findById(req.params.id)
        .then((direccion) => {
            res.json(direccion)
        })
}

exports.verDirecciones = (req, res) => {
    Direccion.find()
        .then((direcciones) => {
            res.json(direcciones);
        })
}


exports.verShipTo = (req, res) => {
    Direccion.find().distinct('shipTo')
        .then((ships) => {
            res.json(ships)
        })

}

exports.verInvoice = (req, res) => {
    Direccion.find().distinct('invoice')
        .then((invoice) => {
            res.json(invoice)
        })

}




