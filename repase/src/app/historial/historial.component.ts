import { Component, OnInit } from '@angular/core';
import { PiezaService } from '../servicios/pieza.service';
import { ProveedorService } from '../servicios/proveedor.service';
import swal from 'sweetalert2'
declare var $: any
declare var JQuery: any
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  piezas: any = []
  pieza: string = ''
  constructor(private proveedorService: ProveedorService, private piezaService: PiezaService) {
    this.getData()
  }

  getData() {
    this.piezaService.verHistorialPiezas()
      .then((piezas) => {

        this.piezas = piezas;
      })

  }
  ngOnInit() {
  }
  guardarPieza() {
    this.piezaService.verificarExistencia($('#noPieza').val())
      .then((data: any) => {
        if (data.existe) {
          swal({
            title: 'La pieza se encuentra registrada',
            text: "¿Deseas actualizarla ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar'
          }).then((result) => {
            if (result.value) {
              var form = { noPieza: $('#noPieza').val(), descripcion: $('#descripcion').val(), precio: $('#precio').val(), anio: $('#anio').val(), proveedor: $('#proveedor').val() }

              this.piezaService.registrarHistorialPrecios(form)
                .then((piezas) => {
                  $('#noPieza').val('')
                  $('#descripcion').val('')
                  $('#precio').val('')
                  $('#anio').val('')
                  $('#proveedor').val('')
                  this.piezas = piezas;
                })
              swal(
                'Actualizado!',
                'La pieza se actualizo con éxito.',
                'success'
              )
            }
          })
        } else {
          var form = { noPieza: $('#noPieza').val(), descripcion: $('#descripcion').val(), precio: $('#precio').val(), anio: $('#anio').val(), proveedor: $('#proveedor').val() }

          this.piezaService.registrarHistorialPrecios(form)
            .then((piezas) => {
              $('#noPieza').val('')
              $('#descripcion').val('')
              $('#precio').val('')
              $('#anio').val('')
              $('#proveedor').val('')
              this.piezas = piezas;
            })
        }
      })


  }
  ngAfterViewInit() {
    this.piezaService.verPiezas()
      .then((piezas) => {

        $('#noPieza').autocomplete({
          source: piezas
        })
      })

    this.proveedorService.obtenerNombres()
      .then((nombres) => {

        $('#proveedor').autocomplete({
          source: nombres
        })
      })
  }


}

