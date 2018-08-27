import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor'

@Injectable()
export class ClienteService {

  constructor(public http:Http) { }

verClientes(){
  return new Promise((resolve,reject)=>{
    this.http.get(CONFIG.API+'cliente',sendToken())
    .subscribe((clientes)=>{
      
      resolve(clientes.json())
    },(err)=>{
      console.log({'error cliente':err})
      reject(err)
    })
  })
}
registarCliente(datos) {
  return new Promise((resolve, reject) => {
    this.http.post(CONFIG.API + 'cliente', datos,sendToken())
      .subscribe((cliente) => {
        resolve(cliente.json())
      }, (err) => {
        reject(err)
      })
  })


}

verCliente(idCliente){
  return new Promise((resolve, reject) => {
    this.http.get(CONFIG.API + 'cliente/'+idCliente ,sendToken())
      .subscribe((cliente) => {
        resolve(cliente.json())
      }, (err) => {
        reject(err)
      })
  })
}

actualizar(datos){
  return new Promise((resolve, reject) => {
    this.http.put(CONFIG.API + 'cliente/'+datos._id, datos,sendToken())
      .subscribe((cliente) => {
        resolve(cliente.json())
      }, (err) => {
        reject(err)
      })
  })
}
verNombres(){
  return new Promise((resolve,reject)=>{
    this.http.get(CONFIG.API+'cliente/nombres/arreglo',sendToken())
    .subscribe((clientes)=>{
      
      resolve(clientes.json())
    },(err)=>{
      console.log({'error cliente':err})
      reject(err)
    })
  })
}

}
