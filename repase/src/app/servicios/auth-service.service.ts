import { Injectable } from '@angular/core';
import {Http,Headers,Response,Request} from '@angular/http';
import CONFIG from '../config';
import sendToken from '../../app/auth.interceptor'

@Injectable()
export class AuthServiceService {

  constructor(private http:Http) { }


  isAuthenticated(){
    if(sendToken().headers){
      return true;
    }else{
      return false;
    }
    
}

}
