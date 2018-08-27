import { Component, OnInit } from '@angular/core';
import { PiezaService } from '../servicios/pieza.service';
import { ProveedorService } from '../servicios/proveedor.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

declare var $: any
declare var JQuery: any
@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',

})
export class PiezaComponent implements OnInit {
  id:any=''
  pieza:any={}
  form: any = {
    marca: {}
  }
  mensaje: any = ''
  marcas: any = []
  piezas: any = []
  proveedores: any = []
  constructor(private route: ActivatedRoute, public piezaService: PiezaService, public proveedorService: ProveedorService) {
    this.getData();
  }

  guardarPieza() {
    this.form.marca = $('#marca').val()
    this.piezaService.guardarPieza(this.form)
      .then((piezas) => {
        this.form = {
          marca:{}
        }
        this.piezas=piezas;
        
      })

  }

  getData() {
    this.route.params.subscribe(params => {
      this.id=params['id'];
      if (params['id']) {
        this.piezaService.verPieza(this.id)
          .then((pieza:any) => {
            this.form = pieza;
          })
      }
    })
    this.proveedorService.verProveedores()
      .then((proveedores) => {
        this.proveedores = proveedores;
      })
    this.proveedorService.verMarcas()
      .then((marcas) => {
        this.marcas = marcas
      })
    this.piezaService.obtenerPiezas()
      .then((piezas) => {
        this.piezas = piezas;
      })
  }

  ngOnInit() {

    this.proveedorService.verNombreMarcas()
      .then((marcas) => {
        $('#marca').autocomplete({
          source: marcas
        })
      })

  }
  actualizarPieza(){
    this.piezaService.actualizarPieza(this.form)
    .then((piezas)=>{
      swal(
        '',
        'Pieza guardada con éxito',
        'success'
      )
      this.piezas=piezas;
    })
  }

  eliminarPieza(pieza){
    swal({
      title: '¿Estás seguro/a de eliminar la pieza?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.piezaService.eliminarPieza(pieza)
          .then((piezas) => {
            this.piezas=piezas;
            swal(
              'Eliminación con éxito!',
              'La pieza ha sido borrada',
              'success'
            )
          })

      }
    })
  }


}
