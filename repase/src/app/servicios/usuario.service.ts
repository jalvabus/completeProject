import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor'
@Injectable()
export class UsuarioService {

  constructor(public http:Http) { }


  verUsuariosVendedores(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'usuario/vendedor',sendToken())
      .subscribe((usuarios)=>{
        resolve(usuarios.json())
      },(err)=>{
          reject(err)
      })
    })
  }

  getUsuario(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'usuario/fetchUsuario',sendToken())
      .subscribe((usuario)=>{
        resolve(usuario.json())
      },(err)=>{
          reject(err)
      })
    })
  }

  registrarUsuario(datos){
    return new Promise((resolve,reject)=>{
      this.http.post(CONFIG.API+'usuario',datos,sendToken())
      .subscribe((usuario)=>{
        resolve(usuario.json())
      },(err)=>{
          reject(err)
      })
    })
  }

  actualizar(datos){
    return new Promise((resolve,reject)=>{
      this.http.put(CONFIG.API+'usuario/'+datos._id,datos,sendToken())
      .subscribe((data)=>{
        resolve(data.json())
      },(err)=>{
          reject(err)
      })
    })

  }

  

}
