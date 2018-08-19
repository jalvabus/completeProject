var Concepto = require('./concepto.model');

exports.verConceptos = function(req, res){
    var query = Concepto.find();
    query.exec().then((conceptos)=>{
        res.json(conceptos);
    });
}

exports.verConcepto = function(req, res){
    var query = Concepto.findById(req.params.id);
    query.exec().then((concepto)=>{
        res.json(concepto);
    });
}

exports.registrarConcepto = function(req, res){
    var concepto = new Concepto({
        nombre: req.body.nombre
    });

    concepto.save().then((respuesta)=>{
        res.json(respuesta);
    });
}

exports.modificarConcepto = function(req, res){
    var query = Concepto.findById(req.params.id);
    query.exec().then((concepto)=>{    
        concepto.save().then((respuesta)=>{
            res.json(respuesta);
        });
    });
}

exports.eliminarConcepto = function(req, res){
    
}