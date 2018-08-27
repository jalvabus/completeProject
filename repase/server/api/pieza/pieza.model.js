
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pieza_schema = new Schema({
    noPieza: String,
    marca: { type: Schema.Types.ObjectId, ref: 'Marca' },
    modelo: String,
    descripcion: String,
    deletedAt:Date
});

pieza_schema.pre('remove', function (next) {
    var pieza=this;
    console.log("THIS ID", pieza._id);
    var currentDate = new Date();
    pieza.deletedAt = currentDate;
    next();
});

var Pieza = mongoose.model('Pieza', pieza_schema);

module.exports = Pieza;