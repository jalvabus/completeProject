import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../servicios/login.service';
import {UsuarioService} from '../servicios/usuario.service';
import swal from 'sweetalert2'
@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  form:any={}
  constructor(public usuarioService:UsuarioService,public loginService:LoginService, public router:Router) {

  }
  
  ngOnInit() {

  } 

  login(){
    this.loginService.doLogin(this.form)
    .then((token)=>{

      this.usuarioService.getUsuario()
      .then((usuario: any)=>{
        if(usuario.rol==='V'){
          this.router.navigate(['/'])
        }else if(usuario.rol==='C'){
          this.router.navigate(['/'])
        }else if(usuario.rol==='A'){
          this.router.navigate(['/'])
        }
      })
      

    })
    .catch((err)=>{
      swal(
        'Algo salió mal...',
        'Usuario o contraseña incorrecta',
        'error'
      )
    })
  }

}
