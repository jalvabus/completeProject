import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor';
@Injectable()
export class ProveedorService {

  constructor(public http:Http) { }

  registrarProveedor(datos){
    return new Promise((resolve,reject)=>{
      this.http.post(CONFIG.API+'proveedor',datos,sendToken())
      .subscribe((proveedor)=>{
        resolve(proveedor.json())
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }
  

  verProveedores(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'proveedor',sendToken())
      .subscribe((proveedores)=>{
        resolve(proveedores.json())
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }

  registrarMarca(datos){
    return new Promise((resolve,reject)=>{
      this.http.post(CONFIG.API+'marca',datos,sendToken())
      .subscribe((marcas)=>{
        resolve(marcas.json())
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }

  verMarcas(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'marca',sendToken())
      .subscribe((marcas)=>{
        resolve(marcas.json())
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }
  verNombreMarcas(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'marca/nombres',sendToken())
      .subscribe((marcas)=>{
        resolve(marcas.json())
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }
  

  verProveedor(idProveedor){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'proveedor/'+idProveedor,sendToken())
      .subscribe((proveedoor)=>{
        resolve(proveedoor.json())
      },(err)=>{
        reject(err)
      })
    })
  }
  
  verProveedoresXMarca(marca){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'proveedor/marca/'+marca,sendToken())
      .subscribe((proveedoores)=>{
        resolve(proveedoores.json())
      },(err)=>{
        reject(err)
      })
    })
  }
  actualizar(proveedor){
    return new Promise((resolve,reject)=>{
      this.http.put(CONFIG.API+'proveedor/'+proveedor._id,proveedor,sendToken())
      .subscribe((proveedor)=>{
        resolve(proveedor.json())
      },(err)=>{
        reject(err)
      })
    })
  } 
  actualizarMarca(marca){
    return new Promise((resolve,reject)=>{
      this.http.put(CONFIG.API+'marca/'+marca._id,marca,sendToken())
      .subscribe((marcas)=>{
        resolve(marcas.json())
      },(err)=>{
        reject(err)
      })
    })
  }

  eliminarMarca(marca){
    return new Promise((resolve,reject)=>{
      this.http.delete(CONFIG.API+'marca/'+marca._id,sendToken())
      .subscribe((marcas)=>{
        resolve(marcas.json())
      },(err)=>{
        reject(err)
      })
    })
  }

  obtenerNombres(){
    return new Promise((resolve,reject)=>{
      this.http.get(CONFIG.API+'proveedor/obtener/nombres',sendToken())
      .subscribe((nombres)=>{
        resolve(nombres.json())
      },(err)=>{
        reject(err)
      })
    })
  }
  

}
