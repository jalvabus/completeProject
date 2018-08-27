import { Component, OnInit } from '@angular/core';
import {UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  form:any={
    email:{}
  }

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
  }

  registrar(){
    this.usuarioService.registrarUsuario(this.form)
    .then((data: any)=>{
      alert(data.mensaje)
      this.form={
        email:{}
      }
    })
  }

}
