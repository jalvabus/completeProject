import { Component, OnInit } from '@angular/core';
import { RequisicionService } from '../servicios/requisicion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2StyledDirective } from "ng2-styled-directive/ng2-styled.directive";
import { SlideAbleDirective } from "ng2-slideable-directive/slideable.directive";
import swal from 'sweetalert2'
@Component({
  selector: 'app-detalle-requisicion',
  templateUrl: './detalle-requisicion.component.html',
  styleUrls: ['./detalle-requisicion.component.css']
})
export class DetalleRequisicionComponent implements OnInit {
  cargando = false;
  precioProveedor: ''
  requisicion: any = {
    cliente: {
      nombre: '',
      direccion: {}
    },
    piezas: []
  }
  status: any = {}
  marcas: any = []
  monedas: any = []
  subrequisicion: any = {}
  constructor(private route: ActivatedRoute, private router: Router, private requisicionService: RequisicionService) {
    this.getData()
  }
  guardarStatus() {
    this.requisicionService.statusPiezas(this.requisicion)
      .then((data: any) => {
        if (data.sucess) {
          swal(
            '',
            'Status guardado con éxito',
            'success'
          )
        }
      })
  }
  ngOnInit() {

  }
  getData() {
    this.route.params.subscribe(params => {
      this.requisicionService.verRequisicion(+params['id'])
        .then((requisicion) => {

          this.requisicion = requisicion;
          this.subrequisicion.requisicion = requisicion;
          this.requisicion.piezas.forEach(pieza => {

            if (this.marcas.findIndex(i => i._id === pieza.pieza.marca._id) === -1) {
              this.marcas.push(pieza.pieza.marca)
            }
            if (this.monedas.indexOf(pieza.moneda) === -1) {
              this.monedas.push(pieza.moneda);
            }
          });
        })
    });

  }


  guardar() {
    if (+this.requisicion.etapa == 1) {
      this.requisicionService.actualizar(this.requisicion)
        .then((data: any) => {
          swal(
            '',
            data.mensaje,
            'success'
          )
        })

    } else if (+this.requisicion.etapa == 3) {
      this.actualizarPiezaRequisicion()

    }
  }
  actualizarPrecio(pieza) {
    pieza.precioPublico = ((pieza.precioProveedor * pieza.porcentaje) / 100) + pieza.precioProveedor
  }

  actualizarPiezaRequisicion() {

    this.requisicionService.actualizarRequsicion(this.requisicion)
      .then((data: any) => {
        swal(
          '',
          data.mensaje,
          'success'
        )
        this.requisicion = data.requisicion;
        this.requisicion.piezas.forEach(pieza => {

          if (this.monedas.indexOf(pieza.moneda) === -1) {
            this.monedas.push(pieza.moneda);
          }
        });
      })
  }

  solicitarCotizacion(marca) {
    this.cargando = true;
    this.requisicionService.verPiezasXMarca(this.requisicion._id, marca, marca.proveedoresSeleccionados, marca.comentarios)
      .then((data: any) => {
        this.cargando = false;
        swal(
          '',
          data.mensaje,
          'success'
        )
      })
  }


  anterior() {
    if (this.requisicion.etapa != 1) {
      this.requisicion.etapa = this.requisicion.etapa - 1;
      this.requisicionService.actualizarEtapa(this.requisicion)
        .then((requisicion) => {
          this.requisicion = requisicion;
        })
    }


  }
  siguiente() {
    if (this.requisicion.etapa != 5) {
      this.requisicion.etapa = this.requisicion.etapa + 1;
      this.requisicionService.actualizarEtapa(this.requisicion)
        .then((requisicion) => {
          this.requisicion = requisicion;
        })
    }


  }

  cotizacionCliente() {
    this.cargando = true;
    this.requisicionService.cotizacionCliente(this.requisicion._id, this.monedas)
      .then((data: any) => {
        this.cargando = false;
        swal(
          '',
          data.mensaje,
          'success'
        )
      })
      .catch((err) => {
        this.cargando = false;
        swal(
          '',
          '¡ Cotización no enviada! Verifica tu correo y contraseña e intentalo de nuevo !',

          'error'
        )
      })
  }

  ordenCompraP() {
    this.cargando = true;
    this.requisicionService.ordenCompraProveedor(this.requisicion._id)
      .then((m: any) => {
        this.cargando = false;
        swal(
          '',
          m.mensaje,
          'success'
        )
      })
  }

  visualizarCotizacionCliente(moneda) {
    console.log(moneda)
    this.cargando = true;
    this.requisicionService.visualizarCotizacionCliente(this.requisicion._id, moneda)
      .then((file: any) => {
        console.log(file)
        window.open(file.url, '_blank')
        this.cargando = false;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  visualizarOrdenCliente(moneda) {
    this.cargando = true;
    this.requisicionService.visualizarOrdenCliente(this.requisicion._id, moneda)
      .then((file: any) => {

        window.open(file.url, '_blank')
        this.cargando = false;
      })
      .catch((err) => {
        console.log(err)
      })
  }
  ordenCliente() {
    this.cargando = true;
    this.requisicionService.ordenCliente(this.requisicion._id, this.monedas)
      .then((data: any) => {
        this.cargando = false;
        swal(
          '',
          data.mensaje,
          'success'
        )
      }).catch((err) => {
        this.cargando = false;
        swal(
          '',
          '¡Cotización no enviada! Verifica tu correo y contraseña e intentalo de nuevo!',
          'error'
        )
      })
  }

  eliminarPieza(id) {
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
        this.requisicionService.eliminarPieza(this.requisicion._id, id)
          .then((requisicion) => {
            this.requisicion = requisicion;
          })
        swal(
          'Eliminado!',
          'La pieza se elimino con éxito.',
          'success'
        )
      }
    })

  }

  enviarOrdenP(sub: any) {
    this.cargando = true;
    this.subrequisicion.sub = sub;

    this.requisicionService.ordenCompraProveedor(this.subrequisicion)
      .then((data: any) => {
        this.cargando = false;
        swal(
          '',
          data.mensaje,
          'success'
        )
      }).catch((err) => {
        this.cargando = false;
        swal(
          '',
          '¡Cotización no enviada! Verifica tu correo y contraseña e intentalo de nuevo!',
          'error'
        )
      })
  }

  visualizarOrdenP(sub) {
    this.subrequisicion.sub = sub;
    this.cargando = true;
    this.requisicionService.visualizarOrdenProveedor(this.subrequisicion, this.requisicion._id)
      .then((file: any) => {

        window.open(file.url, '_blank')
        this.cargando = false;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  guardarSub(sub) {
    this.requisicionService.agregarFacturacionSub({ idRequisicion: this.requisicion._id, sub: sub })
      .then((requisicion) => {
        this.requisicion = requisicion;
      })
  }
}
