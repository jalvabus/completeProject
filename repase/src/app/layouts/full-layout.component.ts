import { Component, OnInit } from '@angular/core';
import {UsuarioService}  from '../servicios/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public disabled:boolean = false;
  usuario:any={}
  constructor(private router:Router,public usuarioService:UsuarioService) {
    this.usuarioService.getUsuario()
    .then((usuario :any)=>{
      
          this.usuario=usuario;
      
    })
   }

 
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  cerrarSesion(){
    window.localStorage.removeItem("usuario");
    window.localStorage.removeItem("token");
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {}
}
