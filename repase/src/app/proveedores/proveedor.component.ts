import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../servicios/proveedor.service';
import{PiezaService} from '../servicios/pieza.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  
  
})
export class ProveedorComponent implements OnInit {
  form:any={
    marcas:[]
  }
  piezas:any=[]
  proveedores:any=[];
  proveedor:any={}
  showBoton=false;
  marcas:any=[]

  constructor(private route:ActivatedRoute,public proveedorService:ProveedorService,public piezaService:PiezaService) {
    this.getData()
   }

  ngOnInit() {
  }
  guardarProveedor(){
    console.log(this.form)
      this.proveedorService.registrarProveedor(this.form)
      .then((proveedores)=>{
        if(proveedores){
          this.proveedores=proveedores;
          this.form={
            marcas:[]
          }
          swal(
            '',
            'Proveedor guardado con éxito',
            'success'
          )
        }
      })
  }

  getData(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.proveedorService.verProveedor(params['id'])
        .then((proveedoor)=>{
          this.showBoton=true;
          this.form=proveedoor;
        })
      }else{
        this.showBoton=false;
      }
      
    })
    this.piezaService.verPiezas()
    .then((piezas)=>{
      return this.piezas=piezas;
    })
    .then(()=>{
      this.proveedorService.verProveedores()
      .then((proveedores)=>{
        this.proveedores=proveedores;
      })
    })
    this.proveedorService.verMarcas()
    .then((marcas)=>{
      this.marcas=marcas
    })
   

  }

  verProveedor(proveedor){
    console.log(proveedor)
    
  }

  agregarMarca(){
    
    this.proveedorService.registrarMarca(this.form)
    .then((result:any)=>{
      if(result.msg){
        this.marcas=result.marcas;
      }else{
        swal(
          '',
          'La marca ya existe',
          'error'
        )
      }
    })
  }
  setSelected(marcas){
    
  }
  actualizarProveedor(){
    this.proveedorService.actualizar(this.form)
    .then((proveedores)=>{
      swal(
        '',
        'Proveedor actualizado con éxito',
        'success'
      )
    })
  }
  

}
