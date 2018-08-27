import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,Router } from '@angular/router';
import {AuthServiceService} from './auth-service.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  

  canActivate(){
    
   if(this.authServiceService.isAuthenticated()){
     return true;
   }else{
    this.router.navigate(['/login']);
     return false;
   }
    
  }


  constructor( private router:Router,private authServiceService: AuthServiceService) { }

}
