var CuentaBancaria = require('./cuenta-bancaria.model');
var Deposito = require('./deposito.model');

exports.registrarCuentaBancaria = function (req, res) {
    var cuenta = new CuentaBancaria({
        noCuenta: req.body.noCuenta,
        banco: req.body.banco
    });

    cuenta.save().then((respuesta) => {
        res.json(respuesta);
    });
}

exports.verCuentasBancarias = (req, res) => {
    var query = CuentaBancaria.find()
    .populate({
        path: 'gastos',
        model: 'Gasto'
    });
    query.exec().then((cuentas) => {
        res.json(cuentas);
    });
}

exports.verCuentaBancaria = (req, res) => {
    var query = CuentaBancaria.findById(req.params.id).populate({
        path: 'gastos',
        model: 'Gasto'
    });
    query.exec().then((cuenta) => {
        res.json(cuenta);
    });
}

exports.modificarCuentaBancaria = (req, res) => {
    CuentaBancaria.findById(req.body.id)
        .exec()
        .then((cuenta) => {
            cuenta.noCuenta = req.body.noCuenta;
            cuenta.banco = req.body.noCuenta;
            cuenta.save().then((respuesta) => { res.json(respuesta); })
        })
}

exports.registrarDeposito = (req, res) => {
    console.log(req.params);
    console.log(req.body);
    
    CuentaBancaria.findById(req.params.id)
        .exec()
        .then((cuenta) => {

            var deposito = {
                concepto: req.body.concepto,
                monto: parseInt(req.body.monto)
            }
            
            cuenta.depositos.push(deposito);

            cuenta.save().then((respuesta) => {
                res.json(respuesta);
            })

        })

}