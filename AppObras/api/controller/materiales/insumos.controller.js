var Insumos = require('./insumos.model');

exports.verTodos = (req, res) => {
    Insumos.find().then((insumo)=>{
        res.json(insumo);
    })
}

