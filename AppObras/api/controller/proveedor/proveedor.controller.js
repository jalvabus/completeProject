var Proveedor = require('./proveedor.model');
var Gasto = require('../gasto/gasto.model');

exports.verProveedores = (req, res) => {

    var query = Proveedor.find();
    query.exec().then((proveedor) => {
        res.json(proveedor)
    })
    /*
    Gasto.find()       
        .distinct('proveedor')
        .exec()
        .then((proveedores) => {
            res.json(proveedores);
        })
        */
}

exports.verProveedor = (req, res) => {
    var query = Proveedor.findById(req.params.id);
    query.exec().then((proveedor) => {
        res.json(proveedor)
    })
}

exports.guardarProveedor = (req, res) => {
    var proveedor = new Proveedor(
        {
            nombre: req.body.nombre
        }
    );

    proveedor.save().then((respuesta) => {
        res.json(respuesta);
    })
}

exports.modificarProveedor = (req, res) => {

}

exports.eliminarProveedor = (req, res) => {

}