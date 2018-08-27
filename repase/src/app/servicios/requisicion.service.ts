import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request } from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor';
@Injectable()
export class RequisicionService {

  constructor(public http: Http) {
    console.log('ReqService')
  }




  verRequisiciones() {

    return new Promise((resolve, reject) => {
      this.http.get(CONFIG.API + 'requisicion', sendToken())
        .subscribe((requisiciones) => {
          resolve(requisiciones.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })

  }

  verRequisicionesCapturista() {

    return new Promise((resolve, reject) => {
      this.http.get(CONFIG.API + 'requisicion/capturista/requisiciones', sendToken())
        .subscribe((requisiciones) => {
          resolve(requisiciones.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })

  }

  registrarRequisicion(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + 'requisicion', datos, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          reject(err)
        })
    })
  }

  verRequisicion(idRequisicion) {
    return new Promise((resolve, reject) => {
      this.http.get(CONFIG.API + 'requisicion/' + idRequisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  actualizarRequsicion(requisicion) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/', requisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }
  verPiezasXMarca(idRequisicion, marca, proveedores, comentarios) {
    return new Promise((resolve, reject) => {
      this.http.get('reportes/envioCP/' + idRequisicion + '/' + marca._id + '/' + proveedores + '/' + comentarios, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }


  actualizarEtapa(requisicion) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/etapa/actualizar', requisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  cotizacionCliente(idRequisicion, monedas) {
    return new Promise((resolve, reject) => {
      this.http.get('reportes/' + idRequisicion + '/' + monedas, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  actualizar(requisicion) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/' + requisicion._id, requisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  ordenCompraProveedor(subrequisicion) {
    return new Promise((resolve, reject) => {
      this.http.post('reportes/ordenCompra/', subrequisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  visualizarCotizacionCliente(idRequisicion, moneda) {
    return new Promise((resolve, reject) => {
      this.http.get('/reportes/visualizar/cotizacion/cliente/' + idRequisicion + '/' + moneda, sendToken())
        .subscribe((pdf) => {
          resolve(pdf)
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })

  }
  visualizarOrdenCliente(idRequisicion, moneda) {
    return new Promise((resolve, reject) => {
      this.http.get('/reportes/visualizarOrdenC/' + idRequisicion + '/' + moneda, sendToken())
        .subscribe((pdf) => {
          resolve(pdf)
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })

  }

  ordenCliente(idRequisicion,monedas) {
    return new Promise((resolve, reject) => {
      this.http.get('reportes/ordenCliente/' + idRequisicion+'/'+monedas, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  eliminarPieza(id, pieza) {

    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + '/requisicion/eliminarPieza/' + id, pieza, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          reject(err)
        })
    })
  }


  visualizarOrdenProveedor(subrequisicion, id) {
    return new Promise((resolve, reject) => {
      this.http.get('reportes/visualizarOrdenP/' + subrequisicion.sub._id + '/' + id, sendToken())
        .subscribe((pdf) => {
          resolve(pdf)
        }, (err) => {
          console.log(err)
          reject(err)
        })
    })

  }

  modificarRequisicion(id, datos) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/' + id, datos, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          reject(err)
        })
    })
  }

  statusPiezas(requisicion) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/actualizar/status', requisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          reject(err)
        })
    })

  }

  agregarFacturacionSub(requisicion) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + 'requisicion/actualizar/sub', requisicion, sendToken())
        .subscribe((requisicion) => {
          resolve(requisicion.json())
        }, (err) => {
          reject(err)
        })
    })
  }
}
