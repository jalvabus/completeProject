import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  busqueda: any = {}

  form: any = {
    direccion: {}
  }
  clientes: any = []
  id: any = '';

  constructor(private route: ActivatedRoute, private clienteService: ClienteService) {
    this.getData()
  }

  ngOnInit() {
  }

  registrar() {
    this.clienteService.registarCliente(this.form)
      .then((cliente) => {
        console.log(cliente)
        this.form = {
          direccion: {}
        }
      })
  }

  getData() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.clienteService.verCliente(this.id)
          .then((cliente) => {
            this.form = cliente;

          })
      }

    })

    this.clienteService.verClientes()
      .then((clientes) => {
        this.clientes = clientes;
      })
  }


  actualizar() {
    this.clienteService.actualizar(this.form)
      .then((cliente: any) => {
        alert(cliente.msj)
      })
  }

  

}
