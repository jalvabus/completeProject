import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor';

@Injectable()
export class PiezaService {

  constructor(public http:Http) { }

  guardarPieza(datos){
    return new Promise((resolve,reject)=>{
      this.http.post(CONFIG.API+'pieza',datos,sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        console.log(err)
        reject(err);
      })
      
    })
  }

  verPiezas(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'pieza',sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }

  obtenerPiezas(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'pieza/piezas/obtener',sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }

  verPieza(id){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'pieza/'+id,sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }
  eliminarPieza(pieza){
    return new Promise((resolve,reject)=>{
      this.http.delete(CONFIG.API+'pieza/'+pieza._id,sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }

  actualizarPieza(pieza){
    return new Promise((resolve,reject)=>{
      this.http.put(CONFIG.API+'pieza/'+pieza._id,pieza,sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }



  //////////////////////// HISTORIAL PRECIOS ///////////////////////////////


  registrarHistorialPrecios(form){
    return new Promise((resolve,reject)=>{
      this.http.post(CONFIG.API+'historial',form,sendToken())
      .subscribe((piezas)=>{
        resolve(piezas.json())
      },(err)=>{
        reject(err)
      })
    })
  }


  verHistorialPiezas(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'historial',sendToken())
      .subscribe((piezas)=>{
          resolve(piezas.json())
      },(err)=>{
        reject(err);
      })
      
    })
  }

  verificarExistencia(pieza){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'historial/'+pieza,sendToken())
      .subscribe((piezas)=>{
        resolve(piezas.json())
      },(err)=>{
        reject(err)
      })
    })
  }

}
