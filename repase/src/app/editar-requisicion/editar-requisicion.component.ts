import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {RequisicionService} from '../servicios/requisicion.service'
import {UsuarioService} from '../servicios/usuario.service';
import{ClienteService} from '../servicios/cliente.service';
import {PiezaService} from '.././servicios/pieza.service';
import {ProveedorService} from '.././servicios/proveedor.service';
import swal from 'sweetalert2'
declare var $:any
declare var JQuery:any
@Component({
  selector: 'app-editar-requisicion',
  templateUrl: './editar-requisicion.component.html',
  styleUrls: ['./editar-requisicion.component.css']
})
export class EditarRequisicionComponent implements OnInit {
  marcas:any=[]
  requisicion:any={
    cliente:{
      direccion:{}
    },
    piezas:[],
    usuario:{}
  }
  cantidadPiezas=0
  contadorPiezas=0;
  
  vendedores:any=[]
  clientes:any=[]
  piezas:any=[]
  constructor(private proveedorService:ProveedorService,private piezaService:PiezaService,private clienteService:ClienteService,private usuarioService:UsuarioService,private router:Router,private route:ActivatedRoute,private requisicionService:RequisicionService) {
    this.getData()
   }
   getData(){
    this.route.params.subscribe(params=>{
      this.requisicionService.verRequisicion(params['id'])
      .then((requisicion:any)=>{
        
        this.requisicion=requisicion;
        this.cantidadPiezas=requisicion.piezas.length;
        this.contadorPiezas=requisicion.piezas.length;
        
      })
      this.usuarioService.verUsuariosVendedores()
      .then((usuarios)=>{
        this.vendedores=usuarios;
      })
      this.clienteService.verClientes()
      .then((clientes)=>{
        this.clientes=clientes;
      })

      this.piezaService.verPiezas()
      .then((piezas)=>{
        this.piezas=piezas
      })

      this.proveedorService.verNombreMarcas()
      .then((marcas)=>{
        this.marcas=marcas;
      })
    })
   }

  ngOnInit() {
  }
  verCliente(e){
    this.requisicion.cliente={nombre:'',direccion:{}}
    this.clienteService.verCliente(e)
    .then((cliente:any)=>{
      this.requisicion.cliente=cliente;
      
    })
  }
  eliminar(id){
    swal({
      title: '¿Estás seguro de eliminar la pieza?',
      text: "No se puede reveertir una vez eliminada la pieza",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this.requisicionService.eliminarPieza(this.requisicion._id,id)
        .then((requisicion)=>{
          this.requisicion=requisicion;
        })
        swal(
          'Eliminado!',
          'La pieza se elimino con éxito.',
          'success'
        )
      }
    })

  }
  addPieza(){
    
    this.cantidadPiezas++;
    this.contadorPiezas++;

    var divNoPieza = $('<div class="form-group col-sm-2"><label for="pieza_' + this.cantidadPiezas + '_noPieza"># de Pieza</label></div>');
    
    var inputPieza=$('<input type="text"  data-idP="' + this.cantidadPiezas + '" class="form-control" id="pieza_' + this.cantidadPiezas + '_noPieza" placeholder="123241554" name="pieza_' + this.cantidadPiezas + '_noPieza"/>')
    
   inputPieza.autocomplete({
      source: this.piezas
  });
 

  inputPieza.appendTo(divNoPieza)

 
  $(document).on('blur', '#pieza_' + this.cantidadPiezas + '_noPieza', function () {
    
    var noPiezaTxt = inputPieza.val()
    var cantidadPiezas=inputPieza.attr('data-idP')
    
    
    $.getJSON('/pieza/'+noPiezaTxt,function (respuesta) {
        if (respuesta) {
          var marca=respuesta.marca.nombre;
            $('#pieza_' + cantidadPiezas + '_marca').val(marca);          
            $('#pieza_' + cantidadPiezas + '_id').val(respuesta._id);  
            $('#pieza_' +cantidadPiezas + '_marca').prop('disabled', true);
            $('#pieza_' + cantidadPiezas + '_modelo').val(respuesta.modelo);
            $('#pieza_' + cantidadPiezas + '_modelo').prop('disabled', true);
            $('#pieza_' + cantidadPiezas + '_descripcion').val(respuesta.descripcion);
            
         
        } else {
            $('#pieza_' + cantidadPiezas + '_marca').val('');
            $('#pieza_' + cantidadPiezas + '_marca').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_modelo').val('');
            $('#pieza_' + cantidadPiezas + '_modelo').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_descripcion').val('');
            $('#pieza_' + cantidadPiezas + '_descripcion').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_id').val(''); 
          }
    });
});
    
    var divMarca = $('<div class="form-group"><label for="pieza_' + this.cantidadPiezas + '_marca">Marca</label></div>');
    var inputMarca=$('<input type="text" class="form-control" id="pieza_' + this.cantidadPiezas + '_marca" placeholder="Tends" name="pieza_' + this.cantidadPiezas + '_marca">')
    inputMarca.autocomplete({
      source:this.marcas
    })
    inputMarca.appendTo(divMarca);
    var divPieza = $('<div class="row" id="pieza_' + this.cantidadPiezas +'"><div class="card-block" ></div>');
    var divModelo = $('<div class="form-group col-sm-2"><label for="pieza_' + this.cantidadPiezas + '_modelo">Modelo</label><input type="text" class="form-control" id="pieza_' + this.cantidadPiezas + '_modelo" name="pieza_' + this.cantidadPiezas + '_modelo" placeholder="Modelo"></div>');
    var divDescripcion = $('<div class="form-group col-sm-2"><label for="pieza_' + this.cantidadPiezas + '_descripcion">Descripción</label><textarea class="form-control" rows="3" id="pieza_' + this.cantidadPiezas + '_descripcion" name="pieza_' + this.cantidadPiezas + '_descripcion"></textarea></div>')
    var divCantidad = $('<div class="form-group col-sm-2"><label for="pieza_' + this.cantidadPiezas + '_cantidad">Cantidad</label><input type="number" class="form-control" id="pieza_' + this.cantidadPiezas + '_cantidad" placeholder="1" name="pieza_' + this.cantidadPiezas + '_cantidad" value="1"><input type="hidden" class="form-control" id="pieza_' + this.cantidadPiezas + '_id"  name="pieza_' + this.cantidadPiezas + '_id"></div>');
    var divEliminar = $('<div class="form-group form-actions col-sm-2"></div>');

    var botonEliminar = $('<button type="button" data-id="' + this.cantidadPiezas + '" class="btn btn-sm btn-default">Eliminar</button></div>');
    

    botonEliminar.click(function(ev){
      $('#pieza_' + $(this).attr('data-id')).remove();
    })
    

    botonEliminar.appendTo(divEliminar);


    (divPieza).append(divNoPieza);
    (divPieza).append(divMarca);
    (divPieza).append(divModelo);
    (divPieza).append(divDescripcion);
    (divPieza).append(divCantidad);
    (divPieza).append(divEliminar);

    $('#piezas').append(divPieza);
    
     
    
  }

  guardar(){
    this.requisicionService.modificarRequisicion(this.requisicion._id,JSON.parse(JSON.stringify($('#formulario').serializeArray())))
    .then(()=>{
      swal(
        '',
        'Requisición actualizada con éxito',
        'success'
      ).then(()=>{
        window.location.reload();
      })
     
    })
  }
  



}
