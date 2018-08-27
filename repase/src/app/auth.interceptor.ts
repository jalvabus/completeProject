import { Headers, RequestOptions } from '@angular/http';


export default function () {
 
  let token = window.localStorage.getItem('token')
  if (token) {
    let headers = new Headers({ 'Authorization':'Bearer ' + token });
    return new RequestOptions({ headers: headers });
  } else {
    return  new RequestOptions({});
  }
}