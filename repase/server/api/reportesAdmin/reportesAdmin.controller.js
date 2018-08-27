var Requiscion = require('../requisicion/requisicion.model');
var Cliente = require('../cliente/cliente.model');
var PiezaRequisicion = require('../requisicion/pieza.requisicion.model');
var sortBy = require('sort-by')


/////////////  REPORTE DE USUARIOS //////////////////////////

exports.requisicionesXVendedor = (req, res) => {
    
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    
    fin.setDate(fin.getDate() + 1);

    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario_des"
            }
        }
        , {
            $group: {
                _id: '$usuario_des.nombre',
                count: { $sum: 1 },
            }
        }


    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}

exports.requisicionesXVendedorFinalizadas = (req, res) => {
    Requiscion.aggregate([
        {
            $match: { etapa: 5 }
        },

        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario_des"
            }
        }
        , {
            $group: {
                _id: '$usuario_des.nombre',
                count: { $sum: 1 },
            }
        }


    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}
exports.requisicionesXVendedorFinalizadasXFecha = (req, res) => {
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    
    fin.setDate(fin.getDate() + 1);

    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },

        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario_des"
            }
        }
        , {
            $group: {
                _id: '$usuario_des.nombre',
                count: { $sum: 1 },
            }
        }

    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}


exports.PasosRequisiciones = (req, res) => {
    
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    
    fin.setDate(fin.getDate() + 1);

    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },
        {
            $group: {
                _id: '$etapa',
                count: { $sum: 1 },
            }
        }

    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });
}


//////////////////  RERPORTES CLIENTE ///////////////////////////

exports.clienteFrecuente = (req, res) => {
    Requiscion.aggregate([

        {
            $lookup: {
                from: "clientes",
                localField: "cliente",
                foreignField: "_id",
                as: "cliente_desc"
            }
        }
        , {
            $group: {
                _id: '$cliente_desc',
                count: { $sum: 1 },
            }
        }
        
    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result.sort(sortBy('-count')))
            res.json(result.sort(sortBy('-count')))
        }
    });

}
exports.clienteFrecuenteXFecha = (req, res) => {
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    fin.setDate(fin.getDate() + 1);

    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },

        {
            $lookup: {
                from: "clientes",
                localField: "cliente",
                foreignField: "_id",
                as: "cliente_desc"
            }
        }
        , {
            $group: {
                _id: '$cliente_desc',
                count: { $sum: 1 },
            }
        }




    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result.sort(sortBy('-count')))
            res.json(result.sort(sortBy('-count')))
        }
    });
}


exports.entradaCliente = (req, res) => {
    
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    fin.setDate(fin.getDate() + 1);

    Cliente.aggregate([
        {
            $group: {
                _id: '$entrada',
                count: { $sum: 1 },

            }
        }


    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });
}
exports.estadoCliente = (req, res) => {
    Cliente.aggregate([


        {
            $group: {
                _id: '$direccion.estado',
                count: { $sum: 1 },

            }
        }



    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json(result)
        }
    });
}



//////////////////// REPORTE PROVEEDOR //////////////////

exports.proveedorFrecuente = (req, res) => {
    Requiscion.aggregate([
        { $unwind: "$subrequisicion" },
        { $project: { subrequisicion: 1 } },
        { $unwind: "$subrequisicion.piezas" },
        { $project: { "subrequisicion.piezas": 1 } },
        {
            $lookup: {
                from: "proveedors",
                localField: "subrequisicion.proveedor",
                foreignField: "_id",
                as: "proveedor_desc"
            }
        },
        {
            $lookup: {
                from: "piezarequisicions",
                localField: "subrequisicion.piezas",
                foreignField: "_id",
                as: "piezas"
            }
        },
        { $unwind: "$piezas" },
        {
            $lookup: {
                from: "proveedors",
                localField: "piezas.proveedor",
                foreignField: "_id",
                as: "proveedor_desc"
            }
        },
        { $unwind: "$proveedor_desc" },


        {
            $group: {
                _id: '$proveedor_desc',
                count: { $sum: 1 },
                total: { $sum: '$piezas.precioUnitarioProveedor' }

            }
        }




    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}


exports.proveedorFrecuenteXFecha = (req, res) => {
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    fin.setDate(fin.getDate() + 1);
    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },
        { $unwind: "$subrequisicion" },
        { $project: { subrequisicion: 1 } },
        { $unwind: "$subrequisicion.piezas" },
        { $project: { "subrequisicion.piezas": 1 } },
        {
            $lookup: {
                from: "proveedors",
                localField: "subrequisicion.proveedor",
                foreignField: "_id",
                as: "proveedor_desc"
            }
        },
        {
            $lookup: {
                from: "piezarequisicions",
                localField: "subrequisicion.piezas",
                foreignField: "_id",
                as: "piezas"
            }
        },
        { $unwind: "$piezas" },
        {
            $lookup: {
                from: "proveedors",
                localField: "piezas.proveedor",
                foreignField: "_id",
                as: "proveedor_desc"
            }
        },
        { $unwind: "$proveedor_desc" },


        {
            $group: {
                _id: '$proveedor_desc',
                count: { $sum: 1 },
                total: { $sum: '$piezas.precioUnitarioProveedor' }

            }
        }




    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}











//////////////// REPORTE PIEZAS /////////////////////

exports.piezaMasVendida = (req, res) => {

    Requiscion.aggregate([


        { $unwind: "$subrequisicion" },
        { $project: { subrequisicion: 1 } },
        { $unwind: "$subrequisicion.piezas" },
        { $project: { "subrequisicion.piezas": 1 } },
        {
            $lookup: {
                from: "piezarequisicions",
                localField: "subrequisicion.piezas",
                foreignField: "_id",
                as: "piezas"
            }
        },
        { $unwind: "$piezas" },
        {
            $lookup: {
                from: "piezas",
                localField: "piezas.pieza",
                foreignField: "_id",
                as: "pieza_desc"
            }
        },
        { $unwind: "$pieza_desc" },
        {
            $lookup: {
                from: "marcas",
                localField: "pieza_desc.marca",
                foreignField: "_id",
                as: "pieza_desc.marca"
            }
        },

        {
            $group: {
                _id: '$pieza_desc',
                count: { $sum: 1 }
            }
        }




    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });

}

exports.piezaMasVendidaXFecha = (req, res) => {

    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    fin.setDate(fin.getDate() + 1);

    Requiscion.aggregate([
        {
            $match: { fecha: { $gt: inicio, $lt: fin } }

        },

        { $unwind: "$subrequisicion" },
        { $project: { subrequisicion: 1 } },
        { $unwind: "$subrequisicion.piezas" },
        { $project: { "subrequisicion.piezas": 1 } },
        {
            $lookup: {
                from: "piezarequisicions",
                localField: "subrequisicion.piezas",
                foreignField: "_id",
                as: "piezas"
            }
        },
        { $unwind: "$piezas" },
        {
            $lookup: {
                from: "piezas",
                localField: "piezas.pieza",
                foreignField: "_id",
                as: "pieza_desc"
            }
        },
        { $unwind: "$pieza_desc" },
        {
            $lookup: {
                from: "marcas",
                localField: "pieza_desc.marca",
                foreignField: "_id",
                as: "pieza_desc.marca"
            }
        },

        {
            $group: {
                _id: '$pieza_desc',
                count: { $sum: 1 }
            }
        }




    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result.sort(sortBy('-count')))
        }
    });
}

exports.piezaMasCotizada = (req, res) => {
    
    var inicio = new Date(req.body.inicio);
    var fin = new Date(req.body.fin)
    fin.setDate(fin.getDate() + 1);
    
    PiezaRequisicion.aggregate([
        {
            $lookup: {
                from: "piezas",
                localField: "pieza",
                foreignField: "_id",
                as: "pieza_desc"
            }
        },
        { $unwind: "$pieza_desc" },
        {
            $lookup: {
                from: "marcas",
                localField: "pieza_desc.marca",
                foreignField: "_id",
                as: "pieza_desc.marca"
            }
        },

        {
            $group: {
                _id: '$pieza_desc',
                count: { $sum: 1 },
            }
        },
        { $sort: { count: -1 } }

    ], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json(result)
        }
    });

}

exports.statusPiezaReq = (req, res) => {
    PiezaRequisicion.updateMany({}, { $set: { activada: true } }, function (err, affected) {
        console.log(err)
        if (!err) {
            res.send('OK affected: ' + affected.nModified)
        }
    })
}









