var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var marca_schema=new Schema({
    nombre:String,
    proveedores:[{type:Schema.Types.ObjectId,ref:'Proveedor'}]
})

var Marca=mongoose.model('Marca',marca_schema);
module.exports=Marca