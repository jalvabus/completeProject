
var Requisicion = require('./requisicion.model');
var PiezaRequisicion = require('./pieza.requisicion.model');
var Cliente = require('.././cliente/cliente.model');
var Pieza = require('../pieza/pieza.model');
var Marca = require('../marca/marca.model');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.agregar = (req, res) => {

    var piezas = new Array()
    var cantidades = new Array()
    var piezasRequisicion = new Array()
    var noPiezas = new Array()
    var modelos = new Array()
    var marcas = new Array();
    var descripcion = new Array();
    var marcasPiezas = new Array();
    return new Promise((resolve, reject) => {
        var dato = {}

        req.body.forEach(function (body, i) {

            if (body.name.indexOf('_noPieza') !== -1) {
                noPiezas.push(body.value)
            }
            if (body.name.indexOf('_modelo') !== -1) {
                modelos.push(body.value)
            }
            if (body.name.indexOf('_descripcion') !== -1) {
                descripcion.push(body.value)
            }
            if (body.name.indexOf('_marca') !== -1) {
                marcasPiezas.push(body.value)
                if (marcas.indexOf(body.value) === -1) {
                    marcas.push(body.value)
                }

            }

            if (body.name === 'cliente') {

                dato.cliente = body.value
            } else if (body.name === 'usuario') {

                dato.usuario = body.value
            } else if (body.name === 'comentarios') {
                dato.comentarios = body.value
            } else if (body.name === 'entrada') {
                dato.entrada = body.value
            } else if (body.name === 'telefono') {
                dato.telefono = body.value
            } else if (body.name === 'email') {
                dato.email = body.value
            } else if (body.name === 'empresa') {
                dato.empresa = body.value
            } else if (body.name === 'rfc') {
                dato.rfc = body.value
            } else if (body.name === 'calle') {
                dato.calle = body.value
            } else if (body.name === 'numeroInterior') {
                dato.numeroInterior = body.value
            } else if (body.name === 'numeroExterior') {
                dato.numeroExterior = body.value
            } else if (body.name === 'colonia') {
                dato.colonia = body.value
            } else if (body.name === 'municipio') {
                dato.municipio = body.value
            } else if (body.name === 'estado') {
                dato.estado = body.value
            } else if (body.name === 'codigoPostal') {
                dato.codigoPostal = body.value
            }

            if (body.name.indexOf('_id') !== -1) {
                if (body.value) {
                    piezas.push(body.value)
                } else if (body.value = '') {
                    piezas.push('undefined')
                } else {

                }

            }
            if (body.name.indexOf('_cantidad') !== -1) {
                cantidades.push(body.value)
            }


        });

        resolve(dato)
    })

        .then((dato) => {
            return new Promise((resolve, reject) => {

                if (marcas.length != 0) {

                    marcas.forEach((marca, i) => {

                        Marca.findOne({ nombre: marca.toUpperCase() }, function (err, marcaPieza) {
                            if (!marcaPieza) {
                                var marcaNueva = new Marca({
                                    nombre: marca.toUpperCase()
                                })
                                marcaNueva.save()
                                    .then((marca) => {

                                    })
                            }
                        })
                        if (i === (marcas.length - 1))
                            resolve(dato)
                    });


                } else {
                    resolve(dato)
                }
            })


                .then((dato) => {
                    return new Promise((resolve, reject) => {
                        if (piezas.indexOf('undefined') !== -1) {
                            var j = 0;
                            piezas.forEach((pieza, i) => {   //agregar las piezas de la requisicion
                                if (pieza.indexOf('undefined') !== -1) {   //si la pieza no existe agregarla
                                    var marcaAgregar = marcasPiezas[j].toUpperCase()
                                    console.log(marcaAgregar)
                                    var modeloAgregar = modelos[j]
                                    var descripcionAgregar = descripcion[j]

                                    Marca.findOne({ nombre: marcaAgregar })
                                        .then((marca) => {
                                            if (marca) {

                                                var pieza = new Pieza({
                                                    noPieza: noPiezas[i],
                                                    marca: marca._id,
                                                    modelo: modeloAgregar,
                                                    descripcion: descripcionAgregar,

                                                });

                                                pieza.save()
                                                    .then((pieza) => {

                                                        var piezaRequisicion = new PiezaRequisicion({
                                                            pieza: pieza._id,
                                                            cantidad: cantidades[i],
                                                            activada: true
                                                        })
                                                        piezaRequisicion.save()
                                                            .then((piezaReq) => {

                                                                piezasRequisicion.push(piezaReq._id);

                                                                resolve(dato)
                                                            }).catch((err) => {
                                                                console.log(err)
                                                            })

                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }
                                        })
                                    j++;


                                }
                            })
                        } else {
                            resolve(dato)
                        }

                    })
                })
                .then((dato) => {


                    return new Promise((resolve, reject) => {
                        piezas.forEach((pieza, i) => {
                            if (pieza.indexOf('undefined') === -1) {
                                //asignarla a la requisición
                                var piezaRequisicion = new PiezaRequisicion({
                                    cantidad: cantidades[i],
                                    pieza: pieza,
                                    activada: true
                                })

                                piezaRequisicion.save()
                                piezasRequisicion.push(piezaRequisicion._id);
                            }


                            if (i === (piezas.length - 1)) { //validar que haya terminado el for para continuar con el siguiente paso
                                console.log(JSON.stringify(piezasRequisicion))
                                dato.piezasRequisicion = piezasRequisicion;
                                resolve(dato)
                            }

                        })
                    })
                })

                .then((dato) => {


                    Cliente.findOne({ nombre: dato.cliente })
                        .then((cliente) => {  //si existe el cliente, agregarlo a la requisicion
                            if (cliente) {

                                if (dato.piezasRequisicion.length != 0) {

                                    var requisicion = new Requisicion({
                                        fecha: new Date(),
                                        usuario: dato.usuario,
                                        cliente: cliente._id,
                                        etapa: 1,
                                        comentarios: dato.comentarios,
                                        entrada: dato.entrada

                                    })

                                    requisicion.save()
                                        .then((requisicion) => {
                                            dato.piezasRequisicion.forEach(function (pieza) {
                                                requisicion.piezas.push(pieza)
                                            });
                                            return requisicion.save()
                                        })
                                        .then((requisicion) => {
                                            res.json(requisicion)
                                            Requisicion.findById(requisicion._id)
                                                .populate({ path: 'usuario', model: 'Usuario' })
                                                .populate({ path: 'cliente', model: 'Cliente' })
                                                .then((requisicion) => {
                                                    console.log(requisicion)
                                                    var transporter = nodemailer.createTransport(smtpTransport({
                                                        service: 'gmail',
                                                        host: 'smtp.gmail.com',
                                                        auth: {
                                                            user: req.usuario.email.email,
                                                            pass: req.usuario.email.password
                                                        }
                                                    }));
                                                    // Definimos el email
                                                    var mailOptions = {
                                                        from: req.usuario.email.email,
                                                        to: requisicion.usuario.email.email,
                                                        subject: 'REPASE - NUEVA REQUISICIÓN #' + requisicion._id,
                                                        text: 'Estimado ' + requisicion.usuario.nombre + ',' + '\n\nHay una nueva requisición con el ID ' + requisicion._id + ', del cliente ' + requisicion.cliente.nombre + ' \n\nAccede al sistema para llevarla a cabo' + '\n\nUn gran saludo'
                                                    };
                                                    // Enviamos el email
                                                    transporter.sendMail(mailOptions, function (error, info) {
                                                        if (error) {
                                                            console.log(error);

                                                        } else {
                                                            console.log('Email enviado')


                                                        }
                                                    })
                                                })


                                        })

                                        .catch((err) => {
                                            console.log(err)
                                        })
                                } else {
                                    res.status(500).json({ error: 'Seleccione al menos una pieza' })
                                }
                            } else { //no existe el cliente agregarlo, y despues asignarlo a la requisicion
                                var cliente = new Cliente({
                                    nombre: dato.cliente,
                                    telefono: dato.telefono,
                                    email: dato.email,
                                    empresa: dato.empresa,
                                    rfc: dato.rfc,
                                    direccion: {
                                        calle: dato.calle,
                                        nInterior: dato.numeroInterior,
                                        nExterior: dato.numeroExterior,
                                        colonia: dato.colonia,
                                        municipio: dato.municipio,
                                        estado: dato.estado,
                                        cPostal: dato.codigoPostal,
                                    }
                                })


                                cliente.save()
                                    .then((cliente) => {
                                        var requisicion = new Requisicion({
                                            fecha: new Date(),
                                            usuario: dato.usuario,
                                            cliente: cliente._id,
                                            etapa: 1,
                                            comentarios: dato.comentarios,
                                            entrada: dato.entrada

                                        })

                                        requisicion.save()
                                            .then((requisicion) => {
                                                dato.piezasRequisicion.forEach(function (pieza) {
                                                    requisicion.piezas.push(pieza)
                                                });
                                                return requisicion.save()
                                            })
                                            .then((requisicion) => {
                                                res.json(requisicion)
                                                //Una vez que se crea la requisición se manda una notificación 

                                                Requisicion.findById(requisicion._id)
                                                    .populate({ path: 'usuario', model: 'Usuario' })
                                                    .populate({ path: 'cliente', model: 'Cliente' })
                                                    .then((requisicion) => {
                                                        console.log(requisicion)
                                                        var transporter = nodemailer.createTransport(smtpTransport({
                                                            service: 'gmail',
                                                            host: 'smtp.gmail.com',
                                                            auth: {
                                                                user: req.usuario.email.email,
                                                                pass: req.usuario.email.password
                                                            }
                                                        }));
                                                        // Definimos el email
                                                        var mailOptions = {
                                                            from: req.usuario.email.email,
                                                            to: requisicion.usuario.email.email,
                                                            subject: 'REPASE - NUEVA REQUISICIÓN #' + requisicion._id,
                                                            text: 'Estimado ' + requisicion.usuario.nombre + ',' + '\n\nHay una nueva requisición con el ID ' + requisicion._id + ', del cliente ' + requisicion.cliente.nombre + ' \n\nAccede al sistema para llevarla a cabo' + '\n\nUn gran saludo'

                                                        };
                                                        // Enviamos el email
                                                        transporter.sendMail(mailOptions, function (error, info) {
                                                            if (error) {
                                                                console.log(error);

                                                            } else {
                                                                console.log('Email enviado')


                                                            }
                                                        })
                                                    })

                                            })

                                            .catch((err) => {
                                                res.status(500).json(err)
                                            })
                                    })
                            }

                        })


                })


        })




}
exports.modificarRequisicion = (req, res) => {

    var piezas = new Array()
    var cantidades = new Array()
    var marcas = new Array();
    var modelos = new Array();
    var descripciones = new Array();
    var noPiezas = new Array();
    var piezasRequisicion = new Array();



    return new Promise((resolve, reject) => {
        var dato = {}
        var dat=req.body.datos;

        req.body.dat.forEach(function (body, i) {
            if (body.name.indexOf('_marca') !== -1) {
                marcas.push(body.value)
            }
            if (body.name.indexOf('_modelo') !== -1) {
                modelos.push(body.value)
            }
            if (body.name.indexOf('_descripcion') !== -1) {
                descripciones.push(body.value)
            }
            if (body.name.indexOf('_noPieza') !== -1) {
                noPiezas.push(body.value)
            }
            if (body.name.indexOf('_cantidad') !== -1) {
                cantidades.push(body.value)
            }

            if (body.name === 'cliente') {

                dato.cliente = body.value
            }
            if (body.name === 'usuario') {

                dato.usuario = body.value
            }
            if (body.name === 'comentarios') {
                dato.comentarios = body.value
            }

            if (body.name.indexOf('_id') !== -1) {
                if (body.value == '') {
                    piezas.push('undefined')
                } else {
                    piezas.push(body.value)
                }

            }
        })


        resolve(dato)
    })
        .then((dato) => {
            return new Promise((resolve, reject) => {
                Requisicion.findById(req.params.id)
                    .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                    .then((requisicion) => {
                        piezas.forEach(pieza => {
                            requisicion.piezas.forEach(piezaReq => {
                                if (piezaReq.pieza._id == pieza) {
                                    res.status(500).end()
                                    req.abort()
                                }
                            });

                        });
                        resolve(dato)
                    })
            })

        }).then((dato) => {

            var j = 0;


            piezas.forEach((pieza, i) => { //iterar las nuevas piezas que
                if (pieza == 'undefined') { //si la pieza no existe, agregarla en este apartado
                    var marcaAgregar = marcas[j]
                    var modeloAgregar = modelos[j]
                    var descripcionAgregar = descripciones[j]

                    Marca.findOne({ nombre: marcaAgregar })
                        .then((marca) => {

                            if (!marca) {
                                var marca = new Marca({
                                    nombre: marcaAgregar.toUpperCase()
                                })
                                marca.save()
                                    .then((marca) => {

                                        var pieza = new Pieza({
                                            noPieza: noPiezas[i],
                                            marca: marca._id,
                                            modelo: modeloAgregar,
                                            descripcion: descripcionAgregar
                                        });

                                        pieza.save()
                                            .then((pieza) => {

                                                var piezaRequisicion = new PiezaRequisicion({
                                                    pieza: pieza,
                                                    cantidad: cantidades[i],
                                                    activada: true
                                                })
                                                piezaRequisicion.save()
                                                piezasRequisicion.push(piezaRequisicion._id);
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })

                                    }).catch((err) => {
                                        console.log(err)
                                    })
                            } else {


                                var pieza = new Pieza({
                                    noPieza: noPiezas[i],
                                    marca: marca._id,
                                    modelo: modeloAgregar,
                                    descripcion: descripcionAgregar
                                });

                                pieza.save()
                                    .then((pieza) => {

                                        var piezaRequisicion = new PiezaRequisicion({
                                            pieza: pieza,
                                            cantidad: cantidades[i],
                                            activada: true
                                        })
                                        piezaRequisicion.save()
                                        piezasRequisicion.push(piezaRequisicion._id);
                                    }).catch((err) => {
                                        console.log(err)
                                    })

                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    j++;
                }
                //si la pieza existe solamente agregarla a la requisicion
                var piezaRequisicion = new PiezaRequisicion({
                    cantidad: cantidades[i],
                    pieza: pieza,
                    activada: true
                })
                piezaRequisicion.save()

                piezasRequisicion.push(piezaRequisicion._id);
            })
            dato.piezasRequisicion = piezasRequisicion;
            return dato
        })

        .then((dato) => {

            Requisicion.findById(req.params.id)
                .then((requisicion) => {


                    if (dato.piezasRequisicion.length !== 0) {

                        requisicion.comentarios = dato.comentarios;
                        requisicion.usuario = dato.usuario;

                        requisicion.save()
                            .then((requisicion) => {
                                dato.piezasRequisicion.forEach(function (pieza) {
                                    requisicion.piezas.push(pieza)
                                });
                                return requisicion.save()
                            })
                            .then((requisicion) => {
                                res.json(requisicion)
                            })

                            .catch((err) => {
                                res.status(500).json(err)
                            })
                    } else {
                        req.body.requisicion.piezas.forEach(pieza => { //actualizar la cantidad de las piezas
                            PiezaRequisicion.findById(pieza._id)
                                .then((piezaReq) => {
                                    piezaReq.cantidad = pieza.cantidad;
                                    piezaReq.save()
                                })
                        });
                        requisicion.comentarios = dato.comentarios;
                        requisicion.usuario = dato.usuario;

                        requisicion.save()
                            .then((requisicion) => {
                                res.json(requisicion)
                            })
                    }
                })


        })


}


exports.verRequisicion = (req, res) => {
    Requisicion.findById(req.params.id)
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })

        .then((requisicion) => {
            res.json(requisicion);
        })
        .catch((err) => {
            res.status(500).json(err)
        })

}
exports.verRequisiciones = (req, res) => {

    Requisicion.find()
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })
        .sort({ fecha: -1 })
        .then((requisicion) => {
            res.json(requisicion)
        })
        .catch((err) => {
            res.status(500).json(err)
        })

}

exports.modificar = (req, res) => {

    Requisicion.findById(req.params.id)
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .then((requisicion) => {
            requisicion.usuario = req.body.usuario,
                requisicion.cliente = req.body.cliente,
                requisicion.proveedor = req.body.proveedor,
                requisicion.etapa = req.body.etapa,
                requisicion.comentarios = req.body.comentarios,
                requisicion.entrada = req.body.entrada
                requisicion.lab = req.body.lab,
                requisicion.descuento = req.body.descuento,
                //requisicion.comentario_cli = req.body.comentario_cli,
                requisicion.tiempoEntrega = req.body.tiempoEntrega

            return requisicion.save();
        })

        .then((requisicion) => {
            res.json({ mensaje: 'Requisición guardada' })
        })
        .catch((err) => {
            res.status(500).json(err)
        })

}

exports.borrar = (req, res) => {
    Requisicion.findById(req.params.id)
        .then((requisicion) => {
            return requisicion.delete();
        })
        .then((requisicion) => {
            res.json(requisicion);
        })
        .catch((err) => {
            res.status(500).json(err)
        })

}

exports.verRequisicionesXVendedor = (req, res) => {

    Requisicion.find({ usuario: req.usuario._id })
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza' } })
        .sort({ fecha: -1 })
        .exec()
        .then((requisicion) => {

            res.json(requisicion)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })



}


exports.modificarPiezaRequisicion = (req, res) => {

    var proveedores = []
    return new Promise((resolve, reject) => {
        var dato = { piezas: [] }
        req.body.piezas.forEach(function (pieza) {
            dato.piezas.push({ precioPublico: pieza.precioUnitarioCliente, precioProveedor: pieza.precioProveedor, porcentaje: pieza.porcentaje, proveedor: pieza.proveedor, cantidad: pieza.cantidad, moneda: pieza.moneda, lab: pieza.lab, tiempoEntrega: pieza.tiempoEntrega })
        });
        resolve(dato)
    })
        .then((dato) => {

            Requisicion.findById(req.body._id)
                .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })

                .then((requisicion) => {
                    requisicion.lab = req.body.lab;
                    requisicion.descuento = req.body.descuento;
                    return requisicion.save()


                })
                .then((requisicion) => {
                    return requisicion.piezas;
                })
                .then((piezas) => {

                    piezas.forEach(function (pieza, i) {

                        if (pieza) {

                            PiezaRequisicion.findById(pieza._id)
                                .populate({ path: 'pieza', model: 'Pieza' })
                                .then((piezaReq) => {

                                    piezaReq.precioProveedor = dato.piezas[i].precioProveedor;
                                    piezaReq.precioPublico = (dato.piezas[i].precioPublico/ dato.piezas[i].cantidad).toFixed(2);
                                    piezaReq.porcentaje = dato.piezas[i].porcentaje;
                                    piezaReq.proveedor = dato.piezas[i].proveedor;
                                    piezaReq.cantidad = dato.piezas[i].cantidad;
                                    piezaReq.moneda = dato.piezas[i].moneda;
                                    piezaReq.lab = dato.piezas[i].lab;
                                    piezaReq.tiempoEntrega = dato.piezas[i].tiempoEntrega;
                                    piezaReq.precioUnitarioCliente = dato.piezas[i].precioPublico.toFixed(2);
                                    piezaReq.precioUnitarioProveedor = (dato.piezas[i].precioProveedor * dato.piezas[i].cantidad).toFixed(2);
                                    piezaReq.save()

                                })
                        }
                    });

                    return { ok: true }
                })
                .then(() => {


                    Requisicion.findById(req.body._id)
                        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'proveedor', model: 'Proveedor' } })
                        .then((requisicion) => {
                            requisicion.piezas.forEach(function (pieza) { //se van agregando los proveedores que existan en la requisicion
                                if (pieza.proveedor) {
                                    if (proveedores.findIndex(i => i.id === pieza.proveedor._id) === -1) {

                                        var proveedor = { id: pieza.proveedor._id, proveedor: pieza.proveedor, piezasReq: [], requisicion: requisicion }
                                        proveedores.push(proveedor)
                                    }
                                }
                            });


                            requisicion.piezas.forEach(pieza => { // se le van asignando las piezas según el proveedor seleccionado
                                if (pieza.proveedor) {
                                    if (pieza.activada) {
                                        proveedores[proveedores.findIndex(i => i.id === pieza.proveedor._id)].piezasReq.push(pieza._id)

                                    }
                                }   

                            });

                            return proveedores
                        })
                        .then((proveedores) => {
                            //Se setea las subrequisciones pasadas
                            Requisicion.findOneAndUpdate({ _id: req.body._id }, { $set: { subrequisicion: [] } }, function (err, affected) {
                                if (affected) {
                                    Requisicion.findById(req.body._id)
                                        .populate({ path: 'usuario', model: 'Usuario' })
                                        .populate({ path: 'cliente', model: 'Cliente' })
                                        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                                        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
                                        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })

                                        .then((requisicion) => {
                                            //se actualiza la subrequsicion de cada uno de los proveedores con sus piezas
                                            proveedores.forEach(function (proveedor) {
                                                requisicion.subrequisicion.push({ proveedor: proveedor.id, piezas: proveedor.piezasReq })

                                            });
                                            requisicion.save()
                                            res.json({ mensaje: 'Piezas guardadas con éxito', requisicion: requisicion })
                                        })
                                }
                            });


                        })
                        .catch((err) => {
                            console.log(err)
                        })

                })


        })







}


exports.verPiezasXMarca = (req, res) => {

    Requisicion.findById(req.params.idRequisicion)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .then((requisicion) => {
            var datos = { piezas: [] }
            requisicion.piezas.forEach(function (pieza) {

                if (pieza.pieza.marca._id == req.params.idMarca) {
                    console.log(pieza)
                    datos.piezas.push(pieza)
                }
            });
            return datos;
        })


        .then((datos) => {
            res.json(datos.piezas)
        })

}


exports.actualizarEtapa = (req, res) => {

    Requisicion.findById(req.body._id)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })

        .then((requisicion) => {
            requisicion.etapa = req.body.etapa;
            return requisicion.save()
        })
        .then((requisicion) => {
            res.json(requisicion)
        })
}


exports.eliminarPieza = (req, res) => {
    PiezaRequisicion.findById(req.body._id)
        .then((piezaReq) => {
            if (piezaReq.activada) {
                piezaReq.activada = false;
                return piezaReq.save();
            } else {
                piezaReq.activada = true;
                return piezaReq.save();
            }

        })
        .then(() => {
            Requisicion.findById(req.params.id)
                .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                .populate({ path: 'usuario', model: 'Usuario' })
                .populate({ path: 'cliente', model: 'Cliente' })
                .then((requisicion) => {
                    res.json(requisicion)
                })
        })
    /*
Requisicion.findOneAndUpdate({ _id: req.params.id }, { $pull: { "piezas": req.body._id } }, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        Requisicion.findById(req.params.id)
            .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
            .populate({ path: 'usuario', model: 'Usuario' })
            .populate({ path: 'cliente', model: 'Cliente' })
            .then((requisicion) => {
                res.json(requisicion)
            })
    }

})
*/

}

//modificar status pieza
exports.statusPieza = (req, res) => {
    return new Promise((resolve, reject) => {
        var dato = { piezas: [] }
        req.body.piezas.forEach(function (pieza) {
            dato.piezas.push({ status: pieza.status, comentarios: pieza.comentarios, paqueteria: pieza.paqueteria, guia: pieza.guia })
        });
        resolve(dato)
    })
        .then((dato) => {

            Requisicion.findById(req.body._id)
                .populate({ path: 'usuario', model: 'Usuario' })
                .populate({ path: 'cliente', model: 'Cliente' })
                .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })

                .then((requisicion) => {
                    if (!requisicion.claveAcceso) {
                        requisicion.claveAcceso = randomstring.generate(6);
                        requisicion.save()
                            .then((requisicion) => {
                            })
                    }



                    return requisicion;

                })
                .then((requisicion) => {

                    return requisicion.piezas;
                })
                .then((piezas) => {

                    piezas.forEach(function (pieza, i) {

                        PiezaRequisicion.findById(pieza._id)
                            .then((piezaReq) => {

                                piezaReq.status = dato.piezas[i].status;
                                piezaReq.guia = dato.piezas[i].guia;
                                piezaReq.comentarios = dato.piezas[i].comentarios;
                                piezaReq.paqueteria = dato.piezas[i].paqueteria;
                                piezaReq.save()
                            })
                    });

                    return { ok: true }
                })
        })
        .then(() => {
            res.json({ sucess: true })
        })
}
exports.actualizarSubrequisicion = (req, res) => {

    return new Promise((resolve, reject) => {
        var subrequisicion = { proveedor: req.body.sub.proveedor._id, piezas: [], envio: req.body.sub.envio, facturacion: req.body.sub.facturacion }
        req.body.sub.piezas.forEach(pieza => {

            subrequisicion.piezas.push(pieza._id)

        });
        resolve(subrequisicion)

    })
        .then((subrequisicion) => {

            Requisicion.findOneAndUpdate({ _id: req.body.idRequisicion, "subrequisicion._id": req.body.sub._id }, { $set: { "subrequisicion.$.facturacion": subrequisicion.facturacion, "subrequisicion.$.envio": subrequisicion.envio } }, function (err, affected) {
                if (affected) {
                    Requisicion.findById(req.body.idRequisicion)
                        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
                        .populate({ path: 'usuario', model: 'Usuario' })
                        .populate({ path: 'cliente', model: 'Cliente' })
                        .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
                        .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })

                        .then((requisicion) => {
                            res.json(requisicion)
                        })
                }
                if (err) {
                    console.log(err)
                }
            })
        })




}

exports.enviarStatus = (req, res) => {
    Requisicion.findById(req.params.id)
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })

        .then((requisicion) => {
            //Enviar correo al cliente con clave para ver el status de sus piezas
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: requisicion.usuario.email.email,
                    pass: requisicion.usuario.email.password
                }
            }));
            // Definimos el email
            var mailOptions = {
                from: requisicion.usuario.email.email,
                to: requisicion.cliente.email,
                subject: 'REPASE - STATUS PEDIDO #' + requisicion._id,
                html: 'Estimado ' + requisicion.cliente.nombre + ',' + '<br><br>Puedes revisar el Status de tus piezas correspondientes a la requisición #' + requisicion._id + ' en nuestro sitio de seguimiento:' + '<br><br>' + "<p style='font-weight:bold;'> Acceso: http://207.38.86.190:16709/acceso </p>" + '<br><br>Clave de acceso:' + requisicion.claveAcceso.fontsize(6) + '<br><br>En REPASE nuestro mayor motivo es la satisfacción de nuestros clientes, con ese objetivo es que solicitamos una breve retroalimentación al servicio brindado. Agradeceríamos tu apoyo contestando el siguiente' + 'Test de satisfacción:'.bold() + '<br><br>' + 'http://repase.mx/formulariosatisfaccionmx'.bold() + '<br><br>El Equipo de REPASE.<br>Refacciones Partes y Servicios<br>Para Grúas Industriales S.A. de C.V.',

            };
            // Enviamos el email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);

                } else {
                    res.json({ mensaje: 'Status enviado con éxito' })
                    console.log('Email enviado')
                }
            })

        })



}

exports.verificarHistorial = (req, res) => {
    PiezaRequisicion.findOne({ proveedor: req.params.idProveedor, pieza: req.params.idPieza })
        .populate({ path: 'proveedor', model: 'Proveedor' })
        .then((piezaReq) => {
            if (piezaReq) {
                if (piezaReq.precioProveedor) {
                    res.json(piezaReq)
                } else {

                    res.status(500).json({ err: "No hay historial de precio" })
                }
            } else {
                res.status(500).json({ err: "No hay historial de pieza" })

            }

        })
}

exports.verHistorialPieza = (req, res) => {

    return new Promise((resolve, reject) => {
        var piezasReq = [];
        PiezaRequisicion.find()
            .populate({ path: 'proveedor', model: 'Proveedor' })
            .populate({ path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } })
            .sort('-precioUnitarioCliente')
            .then((piezas) => {
                piezas.forEach(pieza => {
                    if (pieza.pieza) {
                        if (pieza.precioUnitarioCliente) {
                            if (piezasReq.findIndex(i => i.pieza._id === pieza.pieza._id) === -1) {
                                piezasReq.push(pieza)

                            }

                        }
                    }
                });

                resolve(piezasReq)
            })
            .catch((err) => {
                console.log(err)
            })

    })
        .then((piezas) => {
            console.log(piezas)
            res.json(piezas);
        }).catch((err) => {
            console.log(err)
        })

}



