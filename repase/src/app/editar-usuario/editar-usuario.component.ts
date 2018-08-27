import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../servicios/usuario.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  
  form:any={
    email:{}
  }
  constructor( private usuarioService:UsuarioService) { 
    usuarioService.getUsuario()
    .then((usuario)=>{
      this.form=usuario
      
     })
    
  }

  ngOnInit() {
    
  }

  guardar(){
    console.log(this.form)
this.usuarioService.actualizar(this.form)
.then((data:any)=>{
  swal(
    '',
    data.mensaje,
    'success'
  )
})
  }

}
