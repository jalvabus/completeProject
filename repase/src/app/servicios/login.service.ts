import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor'
 
@Injectable()
export class LoginService {

  constructor(public http:Http) { }

  doLogin(datos){
    return new Promise((resolve, reject) => {
      this.http.post('/login', datos)
        .subscribe((token) => {
          resolve(this.saveToken(token.json()));
        }, (err) => {
          reject(err);
        })
    })
  }
 
  saveToken(token){
    window.localStorage.setItem('token', token);
    this.http.get(CONFIG.API + 'usuario/fetchUsuario', sendToken())
      .subscribe((usuario) => {
        window.localStorage.setItem('usuario',
          JSON.stringify(usuario.json()));
      },
      (err) => { console.log(err) })
    return token;
  }
  }


