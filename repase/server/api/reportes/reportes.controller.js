var Requisicion = require('../requisicion/requisicion.model');
var axios = require('axios');
var request = require('request');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Proveedor = require('../proveedor/proveedor.model');
var randomstring = require("randomstring");
var path = require('path');
var moment = require('moment');
var numeral = require('numeral');

exports.enviarCotizacionProveedor = (req, res) => {
    var proveedores = [];
    req.params.proveedores.split(',').forEach(function (id) {
        Proveedor.findById(id)
            .then((proveedor) => {

                proveedores.push(proveedor)
            })
    });

    Requisicion.findById(req.params.idRequisicion)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'usuario', model: 'Usuario' })
        .then((requisicion) => {

            var datos = { requisicion: requisicion, piezas: [], proveedores: [], comentario: req.params.comentarios }
            requisicion.piezas.forEach(function (pieza) {

                if (pieza.pieza.marca._id == req.params.idMarca) {

                    datos.piezas.push(pieza)
                }
            });
            datos.proveedores = proveedores;
            moment.locale('es')
            datos.fecha = moment(datos.requisicion.fecha).format('LL');

            return datos;

        })

        .then((datos) => {
            return new Promise((resolve, reject) => {
                let file = fs.createWriteStream(path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf'));

                request.post({
                    url: 'http://207.38.86.190:25996/api/report',
                    json: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        'template': { "shortid": 'r17VLou1z' },
                        'data': datos,
                    }
                }).on('error', function (err) {
                    console.log(err)
                }).pipe(file);

                file.on('finish', function () {
                    resolve({ file: file, datos: datos });
                })
            })
                .then((f) => {

                    f.datos.proveedores.forEach(function (proveedor, i) {
                        console.log(f.datos.requisicion.usuario)
                        var transporter = nodemailer.createTransport(smtpTransport({
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            auth: {
                                user: f.datos.requisicion.usuario.email.email,
                                pass: f.datos.requisicion.usuario.email.password
                            }
                        }));

                        // Definimos el email
                        var mailOptions = {
                            from: f.datos.requisicion.usuario.email.email,
                            to: proveedor.email,
                            subject: 'REPASE - COTIZACIÓN #' + datos.requisicion._id,
                            html: 'Estimado ' + proveedor.nombre + ',' + '<br><br> Sirva el presente correo para adjuntar la requisición #' + f.datos.requisicion._id + ' <br><br>Quedamos en espera de su confirmación, dudas, y/o comentarios. <br><br>Un gran saludo. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" >',
                            attachments: [
                                {
                                    filename: 'CotizaciónProveedor.pdf',
                                    path: path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf')
                                }
                            ]
                        };
                        var mailOptionsEnglish = {
                            from: f.datos.requisicion.usuario.email.email,
                            to: proveedor.email,
                            subject: 'REPASE - QUOTATION REQUEST #' + datos.requisicion._id,
                            html: 'Dear ' + proveedor.nombre + ',' + ' <br><br> We kindly request a quotation for the pieces listed on our requisition #' + f.datos.requisicion._id + ', attached as PDF.' + ' <br><br> Waiting for your kind response we are alert for any doubt or observation about the regarding request. <br><br> Best wishes. <br><br> The REPASE Team. <br> Refacciones Partes y Servicios  <br> Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" > ',
                            attachments: [
                                {
                                    filename: 'CotizaciónProveedor.pdf',
                                    path: path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf')
                                }
                            ]
                        };

                        // Enviar copia al vendedor
                        var mailOptions1 = {
                            from: f.datos.requisicion.usuario.email.email,
                            to: f.datos.requisicion.usuario.email.email,
                            subject: 'REPASE - COTIZACIÓN #' + datos.requisicion._id,
                            html: 'Estimado ' + proveedor.nombre + ',' + '<br><br> Sirva el presente correo para adjuntar la requisición #' + f.datos.requisicion._id + ' <br><br>Quedamos en espera de su confirmación, dudas, y/o comentarios. <br><br>Un gran saludo. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" >',
                            attachments: [
                                {
                                    filename: 'CotizaciónProveedor.pdf',
                                    path: path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf')
                                }
                            ]
                        };
                        var mailOptionsEnglish1 = {
                            from: f.datos.requisicion.usuario.email.email,
                            to: f.datos.requisicion.usuario.email.email,
                            subject: 'REPASE - QUOTATION REQUEST #' + datos.requisicion._id,
                            html: 'Dear ' + proveedor.nombre + ',' + ' <br><br> We kindly request a quotation for the pieces listed on our requisition #' + f.datos.requisicion._id + ', attached as PDF.' + ' <br><br> Waiting for your kind response we are alert for any doubt or observation about the regarding request. <br><br> Best wishes. <br><br> The REPASE Team. <br> Refacciones Partes y Servicios  <br> Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" > ',
                            attachments: [
                                {
                                    filename: 'CotizaciónProveedor.pdf',
                                    path: path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf')
                                }
                            ]
                        };


                        // Enviamos el email
                        if (proveedor.idioma == 'Español') {
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado " + i);

                                    if ((i + 1) == f.datos.proveedores.length) {
                                        fs.unlink(path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf'), function (err) {
                                            if (!err) {
                                                console.log('file deleted');
                                            }
                                        })
                                    }

                                }
                            });
                            transporter.sendMail(mailOptions1, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado " + i);
                                }
                            });
                        } else {
                            transporter.sendMail(mailOptionsEnglish, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado " + i);

                                    if ((i + 1) == f.datos.proveedores.length) {
                                        fs.unlink(path.join(__dirname, '../../public/pdf/proveedor' + datos.requisicion._id + '_cotizacionP.pdf'), function (err) {
                                            if (!err) {
                                                console.log('file deleted');
                                            }
                                        })
                                    }

                                }
                            });
                            transporter.sendMail(mailOptionsEnglish1, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado " + i);
                                }
                            });
                        }


                    })
                    res.json({ mensaje: 'Cotizaciones enviadas con éxito' })
                })
                .catch((err) => {
                    console.log(err)
                })
        });




}


exports.enviarCotizacionCliente = function (req, res) { // este método sirve para 
    var monedas = req.params.monedas.split(',');
    var archivosAEnviar = []
    var i = 0;
    monedas.forEach(moneda => {
        Requisicion.findById(req.params.idRequisicion)
            .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
            .populate({ path: 'usuario', model: 'Usuario' })
            .populate({ path: 'cliente', model: 'Cliente' })
            .then((requisicion) => {
                var suma = 0;
                var datos = { requisicion: requisicion, piezas: [] }
                requisicion.piezas.forEach(function (pieza) {
                    if (pieza.activada) {
                        if (pieza.moneda == moneda) {
                            var totalPieza = 0;
                            totalPieza += pieza.cantidad * pieza.precioPublico
                            suma += totalPieza;
                            pieza.precioUnitarioCliente = numeral(pieza.precioUnitarioCliente).format('0,0.00')
                            datos.piezas.push(pieza)
                        }

                    }
                });
                datos.moneda = moneda;
                datos.subtotal = suma.toFixed(2);
                datos.iva2 = suma * .16;
                datos.iva = datos.iva2.toFixed(2);
                datos.total = suma + datos.iva2;
                datos.total = datos.total - (((datos.total) * requisicion.descuento) / 100);
                datos.total = datos.total.toFixed(2);
                moment.locale('es')
                datos.fecha = moment(datos.requisicion.fecha).format('LL');
                //Formato de miles a lo números
                datos.subtotal = numeral(datos.subtotal).format('0,0.00')
                datos.total = numeral(datos.total).format('0,0.00')
                datos.iva = numeral(datos.iva).format('0,0.00')
                return datos;

            })

            .then((datos) => {

                
                return new Promise((resolve, reject) => {

                    var file = fs.createWriteStream(path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf'));

                    request.post({
                        url: 'http://207.38.86.190:25996/api/report',
                        json: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            'template': { "shortid": 'rJO8vSwJf' },
                            'data': datos,
                        }
                    }).on('error', function (err) {
                        console.log(err)
                    }).pipe(file);

                    file.on('finish', function () {
                        resolve({ file: file, datos: datos });
                    })
                })

                    .then((f) => {
                        i++;
                        archivosAEnviar.push({
                            filename: 'CotizacionCliente' + moneda + '.pdf',
                            path: path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf')
                        })
                        if (monedas.length == i) {

                            res.json({ mensaje: 'Cotización enviada con éxito' })


                            var transporter = nodemailer.createTransport(smtpTransport({
                                service: 'gmail',
                                host: 'smtp.gmail.com',
                                auth: {
                                    user: f.datos.requisicion.usuario.email.email,
                                    pass: f.datos.requisicion.usuario.email.password
                                }
                            }));

                            // Definimos el email
                            var mailOptions = {
                                from: f.datos.requisicion.usuario.email.email,
                                to: f.datos.requisicion.cliente.email,
                                subject: 'REPASE - COTIZACIÓN # ' + f.datos.requisicion._id,
                                html: 'Estimado ' + f.datos.requisicion.cliente.nombre + ',' + ' <br><br> Sirva el presente correo para adjuntar la cotización #' + f.datos.requisicion._id + ' <br><br> Quedamos en espera de su confirmación, dudas, y/o comentario <br><br> Un gran saludo <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V.  <br><br><img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" > ',
                                attachments: archivosAEnviar

                            };

                            var mailOptions2 = {
                                from: f.datos.requisicion.usuario.email.email,
                                to: 'lilia@repase.mx', //Enviar cotización de respaldo a este correo
                                subject: 'REPASE - COTIZACIÓN # ' + f.datos.requisicion._id,
                                html: 'Estimado ' + f.datos.requisicion.cliente.nombre + ',' + '<br><br>Sirva el presente correo para adjuntar la cotización #' + f.datos.requisicion._id + '<br><br>Quedamos en espera de su confirmación, dudas, y/o comentario <br><br>Un gran saludo <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V.  <br><br><img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;" > ',
                                attachments: archivosAEnviar

                            };

                            //Mail para el vendedor
                            var mailOptions3 = {
                                from: f.datos.requisicion.usuario.email.email,
                                to: f.datos.requisicion.usuario.email.email,
                                subject: 'REPASE - COTIZACIÓN # ' + f.datos.requisicion._id,
                                html: 'Estimado ' + f.datos.requisicion.cliente.nombre + ',' + ' <br><br> Sirva el presente correo para adjuntar la cotización #' + f.datos.requisicion._id + ' <br><br> Quedamos en espera de su confirmación, dudas, y/o comentario <br><br> Un gran saludo <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V.  <br><br><img src= "' + f.datos.requisicion.usuario.firma + '" style="float: left;"> ',
                                attachments: archivosAEnviar
                            };


                            // Enviamos el email
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado ");
                                }
                            });

                            transporter.sendMail(mailOptions3, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado 3");
                                }
                            });

                            transporter.sendMail(mailOptions2, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado 2");
                                    monedas.forEach(moneda => {
                                        fs.unlink(path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf'), function (err) {

                                        });
                                    })

                                }
                            });

                        }
                    })

                    .catch((err) => {
                        console.log(err)
                    })


            });
    })

}

exports.ordenCompraProveedor = function (req, res) {

    return new Promise((resolve, reject) => {
        var suma = 0;
        var totalPieza = 0;
        var datos = { sub: req.body }
        req.body.sub.piezas.forEach(function (pieza) {
            totalPieza = pieza.cantidad * pieza.precioProveedor;
            suma += totalPieza;

        });
        datos.subtotal = suma.toFixed(2);
        datos.precioTotal = totalPieza.toFixed(2);
        datos.iva2 = 0;
        if (datos.sub.sub.proveedor.iva) {
            datos.iva2 = suma * .16;
        }
        datos.iva = datos.iva2.toFixed(2);
        datos.total = (suma + datos.iva2).toFixed(2);
        moment.locale('es')
        datos.fecha = moment(req.body.requisicion.fecha).format('LL');

        resolve(datos)
    })
        .then((datos) => {
            return new Promise((resolve, reject) => {

                var file = fs.createWriteStream(path.join(__dirname, '../../public/pdf/' + datos.sub.sub.proveedor._id + '_ordenP.pdf'));

                request.post({
                    url: 'http://207.38.86.190:25996/api/report',
                    json: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        'template': { "shortid": 'SJ_HgYqJG' },
                        'data': datos,
                    }
                }).on('error', function (err) {
                    console.log(err)
                }).pipe(file);

                file.on('finish', function () {
                    resolve({ file: file });
                })
            })
                .then((f) => {


                    var transporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: req.body.requisicion.usuario.email.email,
                            pass: req.body.requisicion.usuario.email.password
                        }
                    }));

                    // Definimos el email // ve_cambiassi@hotmail.com jpedraza@repase.mx
                    var mailOptions = {
                        from: req.body.requisicion.usuario.email.email,
                        to: 'jpedraza@repase.mx',
                        subject: 'REPASE - Orden de compra #' + req.body.requisicion._id,
                        html: 'Estimado ' + req.body.requisicion.usuario.nombre + ' <br><br>Favor de llevar a cabo el proceso de compra de lo indicado en el archivo adjunto. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V.  <br><br> <img src= "' +  req.body.requisicion.usuario.firma + '" style="float: left;" > ',
                        attachments: [
                            {
                                filename: 'OrdenCompra.pdf',
                                path: path.join(__dirname, '../../public/pdf/' + datos.sub.sub.proveedor._id + '_ordenP.pdf')
                            }
                        ]
                    };

                    // Mail para el vendedor
                    var mailOptions1 = {
                        from: req.body.requisicion.usuario.email.email,
                        to: req.body.requisicion.usuario.email.email,
                        subject: 'REPASE - Orden de compra #' + req.body.requisicion._id,
                        html: 'Estimado ' + req.body.requisicion.usuario.nombre + ' <br><br>Favor de llevar a cabo el proceso de compra de lo indicado en el archivo adjunto. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V.  <br><br> <img src= "' +  req.body.requisicion.usuario.firma + '" style="float: left;" > ',
                        attachments: [
                            {
                                filename: 'OrdenCompra.pdf',
                                path: path.join(__dirname, '../../public/pdf/' + datos.sub.sub.proveedor._id + '_ordenP.pdf')
                            }
                        ]
                    };

                    // Enviamos el email
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.status(500).json(error.message);
                        } else {
                            console.log("Email enviado ");

                            fs.unlink(path.join(__dirname, '../../public/pdf/' + datos.sub.sub.proveedor._id + '_ordenP.pdf'), function (err) {
                                if (!err) {
                                    console.log('file deleted');
                                }
                            })
                        }
                    });

                    transporter.sendMail(mailOptions1, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.status(500).json(error.message);
                        } else {
                            console.log("Email enviado ");                           
                        }
                    });
                    res.json({ mensaje: 'Email enviado con éxito' })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
}



exports.visualizarCotizacionCliente = (req, res) => {

    /*
    Requisicion.findById(req.params.idRequisicion)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .then((requisicion) => {

            var suma = 0;
            var datos = { requisicion: requisicion, piezas: [] }

            requisicion.piezas.forEach(function (pieza) {
                if (pieza.activada) {
                if (pieza.moneda == req.params.moneda) {
                    pieza.precioUnitarioCliente = numeral(pieza.precioUnitarioCliente).format('0,0.00')
                    var totalPieza = 0;
                    totalPieza += pieza.cantidad * pieza.precioPublico
                    suma += totalPieza;
                    datos.piezas.push(pieza)
                }

            }

            });
            datos.moneda = req.params.moneda;
            datos.subtotal = suma.toFixed(2);


            datos.iva2 = suma * .16;
            datos.iva = datos.iva2.toFixed(2);


            datos.total = suma + datos.iva2;
            datos.total = datos.total - (((datos.total) * requisicion.descuento) / 100);  //Para calcular el descuento
            datos.total = datos.total.toFixed(2);
            moment.locale('es')
            datos.fecha = moment(datos.requisicion.fecha).format('LL');
            //Formato de miles a lo números
            datos.subtotal = numeral(datos.subtotal).format('0,0.00')
            datos.total = numeral(datos.total).format('0,0.00')
            datos.iva = +numeral(datos.iva).format('0,0.00') ;
            return datos;


        })

        .then((datos) => {
            console.log(datos.piezas[0])

            var data = {
                template: { "shortid": 'rJO8vSwJf' },
                data: datos,
                options: {
                    preview: true
                }
            }
            var options = {
                uri: 'http://207.38.86.190:25996/api/report',
                method: 'POST',
                json: data
            }
            request(options).pipe(res)

        })
    .catch((err) => {
            console.log(err)
    })
    */

    Requisicion.findById(req.params.idRequisicion)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .then((requisicion) => {
            var suma = 0;
            var datos = { requisicion: requisicion, piezas: [] }
            requisicion.piezas.forEach(function (pieza) {
                if (pieza.activada) {
                    if (pieza.moneda == req.params.moneda) {
                        var totalPieza = 0;
                        totalPieza += pieza.cantidad * pieza.precioPublico
                        suma += totalPieza;
                        datos.piezas.push(pieza)
                    }
                }
            });
            datos.moneda = req.params.moneda;

            datos.subtotal = suma.toFixed(2);
            datos.iva2 = suma * .16;
            datos.iva = datos.iva2.toFixed(2);

            datos.total = suma + datos.iva2;
            datos.total = datos.total - (((datos.total) * requisicion.descuento) / 100);
            datos.total = datos.total.toFixed(2);
            moment.locale('es')
            datos.fecha = moment(datos.requisicion.fecha).format('LL');
            //Formato de miles a lo números
            datos.subtotal = numeral(datos.subtotal).format('0,0.00')
            datos.total = numeral(datos.total).format('0,0.00')
            datos.iva = numeral(datos.iva).format('0,0.00')
            return datos;

        })

        .then((datos) => {


            var data = {
                template: { "shortid": 'rJO8vSwJf' },
                data: datos,
                options: {
                    preview: true
                }
            }
            var options = {
                uri: 'http://207.38.86.190:25996/api/report',
                method: 'POST',
                json: data
            }
            request(options).pipe(res)

        })

}


exports.ordenCompraCliente = (req, res) => {
    var monedas = req.params.monedas.split(',');
    var archivosAEnviar = []
    var i = 0;
    monedas.forEach(moneda => {
        Requisicion.findById(req.params.idRequisicion)
            .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
            .populate({ path: 'usuario', model: 'Usuario' })
            .populate({ path: 'cliente', model: 'Cliente' })
            .then((requisicion) => {
                var suma = 0;
                var datos = { requisicion: requisicion, piezas: [] }
                requisicion.piezas.forEach(function (pieza) {
                    if (pieza.activada) {
                        if (pieza.moneda == moneda) {
                            var totalPieza = pieza.cantidad * pieza.precioPublico
                            suma += totalPieza;
                            datos.piezas.push(pieza)

                        }
                    }

                })
                datos.moneda = moneda;
                datos.subtotal = suma.toFixed(2);
                datos.iva2 = suma * .16;
                datos.iva = datos.iva2.toFixed(2);
                datos.total = suma + datos.iva2;
                datos.total = datos.total - (((datos.total) * requisicion.descuento) / 100);
                datos.total = datos.total.toFixed(2);
                moment.locale('es')
                datos.fecha = moment(datos.requisicion.fecha).format('LL');
                //Formato de miles a lo números
                datos.subtotal = numeral(datos.subtotal).format('0,0.00')
                datos.total = numeral(datos.total).format('0,0.00')
                datos.iva = numeral(datos.iva).format('0,0.00')
                return datos;

            })

            .then((datos) => {


                return new Promise((resolve, reject) => {


                    var file = fs.createWriteStream(path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf'));

                    request.post({
                        url: 'http://207.38.86.190:25996/api/report',
                        json: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            'template': { "shortid": 'HJSrPsukz' },
                            'data': datos,
                        }
                    }).on('error', function (err) {
                        console.log(err)
                    }).pipe(file);

                    file.on('finish', function () {
                        resolve({ file: file });
                    })
                })
                    .then((f) => {
                        console.log(f)
                        i++;
                        archivosAEnviar.push({
                            filename: 'ConfirmacionDeCompra' + moneda + '.pdf',
                            path: path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf')
                        })

                        if (monedas.length == i) {

                            res.json({ mensaje: 'Confirmación de compra enviada con éxito' })

                            var transporter = nodemailer.createTransport(smtpTransport({
                                service: 'gmail',
                                host: 'smtp.gmail.com',
                                auth: {
                                    user: datos.requisicion.usuario.email.email,
                                    pass: datos.requisicion.usuario.email.password
                                }
                            }));

                            // Definimos el email
                            var mailOptions = {
                                from: datos.requisicion.usuario.email.email,
                                to: datos.requisicion.cliente.email,
                                subject: 'REPASE - Confirmación de compra #' + datos.requisicion._id,
                                html: 'Estimado ' + datos.requisicion.cliente.nombre + ',' + '<br><br>Sirva el presente correo para hacerle llegar la Confirmación de Compra de la Requisición y Orden #' + datos.requisicion._id + '<br><br>Agradeciendo de antemano su atención, quedamos en espera de su sus comentarios. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + datos.requisicion.usuario.firma + '" style="float: left;" >  ',
                                attachments: archivosAEnviar
                            };

                            // Definimos el email para el vendedor
                            var mailOptions1 = {
                                from: datos.requisicion.usuario.email.email,
                                to: datos.requisicion.usuario.email.email,
                                subject: 'REPASE - Confirmación de compra #' + datos.requisicion._id,
                                html: 'Estimado ' + datos.requisicion.cliente.nombre + ',' + '<br><br>Sirva el presente correo para hacerle llegar la Confirmación de Compra de la Requisición y Orden #' + datos.requisicion._id + '<br><br>Agradeciendo de antemano su atención, quedamos en espera de su sus comentarios. <br><br>El Equipo de REPASE. <br>Refacciones Partes y Servicios  <br>Para Grúas Industriales S.A. de C.V. <br><br> <img src= "' + datos.requisicion.usuario.firma + '" style="float: left;" >  ',
                                attachments: archivosAEnviar
                            };


                            // Enviamos el email
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado ");
                                    monedas.forEach(moneda => {
                                        fs.unlink(path.join(__dirname, '../../public/pdf/' + datos.requisicion._id + moneda + '_cotizacionC.pdf'), function (err) {

                                        })
                                    });
                                }
                            });

                            transporter.sendMail(mailOptions1, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json(error.message);
                                } else {
                                    console.log("Email enviado ");
                                }
                            });

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })


            })
    });
}

exports.visualizarOrdenCompraCliente = (req, res) => {

    Requisicion.findById(req.params.idRequisicion)
        .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
        .populate({ path: 'usuario', model: 'Usuario' })
        .populate({ path: 'cliente', model: 'Cliente' })
        .then((requisicion) => {
            var suma = 0;
            var datos = { requisicion: requisicion, piezas: [] }
            requisicion.piezas.forEach(function (pieza) {
                if (pieza.activada) {
                    if (pieza.moneda == req.params.moneda) {
                        var totalPieza = 0;
                        totalPieza += pieza.cantidad * pieza.precioPublico
                        suma += totalPieza;
                        datos.piezas.push(pieza)

                    }
                }
            });
            datos.moneda = req.params.moneda;

            datos.subtotal = suma.toFixed(2);
            datos.iva2 = suma * .16;
            datos.iva = datos.iva2.toFixed(2);

            datos.total = suma + datos.iva2;
            datos.total = datos.total - (((datos.total) * requisicion.descuento) / 100);
            datos.total = datos.total.toFixed(2);
            moment.locale('es')
            datos.fecha = moment(datos.requisicion.fecha).format('LL');
            //Formato de miles a lo números
            datos.subtotal = numeral(datos.subtotal).format('0,0.00')
            datos.total = numeral(datos.total).format('0,0.00')
            datos.iva = numeral(datos.iva).format('0,0.00')
            return datos;

        })

        .then((datos) => {


            var data = {
                template: { "shortid": 'HJSrPsukz' },
                data: datos,
                options: {
                    preview: true
                }
            }
            var options = {
                uri: 'http://207.38.86.190:25996/api/report',
                method: 'POST',
                json: data
            }
            request(options).pipe(res)

        })

}

exports.visualizarOrdenProveedor = (req, res) => {

    return new Promise((resolve, reject) => {
        var datos = { sub: {} }
        Requisicion.findById(req.params.id)
            .populate({ path: 'piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca', populate: { path: 'proveedores', model: 'Proveedor' } } } })
            .populate({ path: 'usuario', model: 'Usuario' })
            .populate({ path: 'cliente', model: 'Cliente' })
            .populate({ path: 'subrequisicion.proveedor', model: 'Proveedor' })
            .populate({ path: 'subrequisicion.piezas', model: 'PiezaRequisicion', populate: { path: 'pieza', model: 'Pieza', populate: { path: 'marca', model: 'Marca' } } })

            .then((requisicion) => {
                datos.sub.requisicion = requisicion; //guardar la requisicion
                requisicion.subrequisicion.forEach(function (sub) { // solamente se muestra la subrequisición que se pida ejemplo, subrequisicion de tal proveedor

                    if (sub._id == req.params.sub) {
                        datos.sub.sub = sub;
                    }

                });
                moment.locale('es')
                datos.fecha = moment(datos.sub.requisicion.fecha).format('LL');
                resolve(datos)
            })

    })
        .then((datos) => {
            return new Promise((resolve, reject) => {
                var suma = 0;

                datos.subtotal = suma.toFixed(2);
                datos.iva2 = 0;

                var copy = [];
                copy = datos.sub.sub.piezas;
                datos.sub.sub.piezas = [];

                copy.forEach(function (pieza) {
                    if (pieza.activada) {
                        datos.sub.sub.piezas.push(pieza);
                        var totalPieza = pieza.cantidad * pieza.precioProveedor;
                        suma += totalPieza;
                    }
                })

                if (datos.sub.sub.proveedor.iva) {
                    datos.iva2 = suma * .16;
                }

                datos.subtotal = suma.toFixed(2);
                datos.iva = datos.iva2.toFixed(2);
                datos.total = suma + datos.iva2;
                //Formato de miles a lo números
                datos.subtotal = numeral(datos.subtotal).format('0,0.00')
                datos.total = numeral(datos.total).format('0,0.00')
                datos.iva = numeral(datos.iva).format('0,0.00')
                resolve(datos)
            })

                .then((datos) => {
                    var data = {
                        template: { "shortid": 'SJ_HgYqJG' },
                        data: datos,
                        options: {
                            preview: true
                        }
                    }
                    var options = {
                        uri: 'http://207.38.86.190:25996/api/report',
                        method: 'POST',
                        json: data
                    }
                    request(options).pipe(res)

                })
                .catch((err) => {
                    console.log(err)
                })

        })


}


