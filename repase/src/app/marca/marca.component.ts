import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../servicios/proveedor.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  marcas: any = []
  constructor(private proveedorService: ProveedorService) {
    this.proveedorService.verMarcas()
      .then((marcas) => {
        this.marcas = marcas;
      })
  }

  ngOnInit() {
  }
  guardar(marca) {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Guardar',
      showCancelButton: true,

    })

    var steps = [
      {
        title: 'Editar marca',
        text: 'Ingresa el nuevo nombre',
        value: marca.nombre
      }
    ]

    swal.queue(steps).then((result) => {
      swal.resetDefaults()

      if (result.value) {
        var datos = result.value;
        console.log(datos[0])
        this.proveedorService.actualizarMarca({ nombre: datos[0], _id: marca._id })
          .then((marcas) => {
            this.marcas = marcas
          })

      }
    })
  }

  eliminar(marca) {
    swal({
      title: '¿Estás seguro/a de eliminar la marca?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.proveedorService.eliminarMarca(marca)
          .then((marcas) => {
            this.marcas=marcas;
            swal(
              'Eliminación con éxito!',
              'La marca ha sido borrada',
              'success'
            )
          })

      }
    })
  }

}
