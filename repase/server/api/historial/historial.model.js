var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var historial_Schema=new Schema({
    pieza:{type:Schema.Types.ObjectId,ref:'Pieza'},
    descripcion:String,
    precio:Number,
    proveedor:{type:Schema.Types.ObjectId,ref:'Proveedor'},
    anio:Number
})

var Historial=mongoose.model('Historial',historial_Schema);
module.exports=Historial;