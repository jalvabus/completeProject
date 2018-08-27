import { Component, OnInit } from '@angular/core';
import {RequisicionService} from '../servicios/requisicion.service';
import {UsuarioService} from '../servicios/usuario.service';
import {PiezaService} from '../servicios/pieza.service';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import {ClienteService} from '../servicios/cliente.service';
import{ProveedorService} from'../servicios/proveedor.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
declare var $:any
declare var JQuery:any
@Component({
  selector: 'app-entrada-requisicion',
  templateUrl: './entrada-requisicion.component.html',
  styleUrls: ['./entrada-requisicion.component.css']
})
export class EntradaRequisicionComponent implements OnInit {
  form:any={
    direccion:{},
  }
  vendedores:any=[]
  clientes:any=[]
  cliente:any={
    direccion:{}
  }
  cantidadPiezas=0
  contadorPiezas=0;
  piezas:any=[]
  
 marcas:any=[]
  
  constructor(private router:Router,private proveedorService:ProveedorService,private piezaService:PiezaService,public clienteService:ClienteService,public usuarioService:UsuarioService,public requisicionService:RequisicionService) {
    this.getData();
    
    
   }

  ngOnInit() {
  }

  registrar(){

    console.log($('#cliente').val())
    if($('#cliente').val()!=''&&$('#entrada').val()!=null&&$('#usuario').val()!=null){
      this.requisicionService.registrarRequisicion(JSON.parse(JSON.stringify($('#formulario').serializeArray())))
      .then((requisicion)=>{
        if(requisicion){
          swal(
            '',
            'Requisición guardada con éxito',
            'success'
          )
          this.router.navigate(['/requisicionesCapt'])
        }
      })
      .catch((err)=>{
        console.log(err)
        swal(
          '',
          'Selecciona al menos una pieza',
          'error'
        )
      })
    }else{
      swal(
        '',
        'Completa todos los campos',
        'error'
      )
    }
    
    
    
  }
  
  eliminarPieza(noPieza){
    
      $('#pieza_' + noPieza).remove();
    
  }

  getData(){
    
    this.usuarioService.verUsuariosVendedores()
    .then((usuarios)=>{
       this.vendedores=usuarios;
    })
    
     

      this.piezaService.verPiezas()
      .then((piezas)=>{
        
        this.piezas=piezas;
      })
      this.proveedorService.verNombreMarcas()
      .then((marcas)=>{
        this.marcas=marcas;
      })
    
  }

  verCliente(e){
    this.clienteService.verCliente(this.form.cliente)
    .then((cliente)=>{
      this.cliente=cliente;
    })

  }
  click(){
    
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
                    
            $('#pieza_' + cantidadPiezas + '_id').val(respuesta._id);  
            $('#pieza_' +cantidadPiezas + '_marca').prop('disabled', true);
            $('#pieza_' + cantidadPiezas + '_marca').val(marca);  
            $('#pieza_' + cantidadPiezas + '_modelo').val(respuesta.modelo);
            $('#pieza_' + cantidadPiezas + '_modelo').prop('disabled', true);
            $('#pieza_' + cantidadPiezas + '_descripcion').val(respuesta.descripcion);
            $('#pieza_' + cantidadPiezas + '_descripcion').prop('disabled', true);
            
         
        } else {
            $('#pieza_' + cantidadPiezas + '_marca').val('');
            $('#pieza_' + cantidadPiezas + '_marca').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_modelo').val('');
            $('#pieza_' + cantidadPiezas + '_modelo').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_descripcion').val('');
            $('#pieza_' + cantidadPiezas + '_descripcion').prop('disabled', false);
            $('#pieza_' + cantidadPiezas + '_id').val('undefined');  
        }
    });
});
    
    var divMarca = $('<div class="form-group"><label for="pieza_' + this.cantidadPiezas + '_marca">Marca</label></div>');
    var inputMarca=$('<input type="text" class="form-control" id="pieza_' + this.cantidadPiezas + '_marca" placeholder="Tends" name="pieza_' + this.cantidadPiezas + '_marca">')
    inputMarca.autocomplete({
      source:this.marcas
    })
    inputMarca.appendTo(divMarca);
    var divPieza = $('<div class="row" id="pieza_'+this.cantidadPiezas+'"><div class="card-block"></div>');
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

  ngAfterViewInit() {
    this.clienteService.verNombres()
    .then((clientes)=>{
      
      $('#cliente').autocomplete({
        source: clientes
      })
    })
     
  $(document).on('blur', '#cliente', function () {
  
    
    
    $.getJSON('/cliente/'+ $('#cliente').val(),function (respuesta) {
     if(respuesta){
      $('#telefono').val(respuesta.telefono)
      $('#telefono').prop('disabled', true);
      $('#email').val(respuesta.email)
      $('#email').prop('disabled', true);
      $('#empresa').val(respuesta.empresa)
      $('#empresa').prop('disabled', true);
      $('#rfc').val(respuesta.rfc)
      $('#rfc').prop('disabled', true);
      $('#calle').val(respuesta.direccion.calle)
      $('#calle').prop('disabled', true);
      $('#numeroInterior').val(respuesta.direccion.nInterior)
      $('#numeroInterior').prop('disabled', true);
      $('#numeroExterior').val(respuesta.direccion.nExterior)
      $('#numeroExterior').prop('disabled', true);
      $('#colonia').val(respuesta.direccion.colonia)
      $('#colonia').prop('disabled', true);
      $('#municipio').val(respuesta.direccion.municipio)
      $('#municipio').prop('disabled', true);
      $('#estado').val(respuesta.direccion.estado)
      $('#estado').prop('disabled', true);
      $('#codigoPostal').val(respuesta.direccion.cPostal)
      $('#codigoPostal').prop('disabled', true);
      }
      else{
        $('#telefono').val('')
        $('#telefono').prop('disabled', false);
        $('#email').val('')
        $('#email').prop('disabled', false);
        $('#empresa').val('')
        $('#empresa').prop('disabled', false);
        $('#rfc').val('')
        $('#rfc').prop('disabled', false);
        $('#calle').val('')
        $('#calle').prop('disabled', false);
        $('#numeroInterior').val('')
        $('#numeroInterior').prop('disabled', false);
        $('#numeroExterior').val('')
        $('#numeroExterior').prop('disabled', false);
        $('#colonia').val('')
        $('#colonia').prop('disabled', false);
        $('#municipio').val('')
        $('#municipio').prop('disabled', false);
        $('#estado').val('')
        $('#estado').prop('disabled', false);
        $('#codigoPostal').val('')
        $('#codigoPostal').prop('disabled', false);
      }
     
    });
});
    
    
  }
}
