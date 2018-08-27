import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsuarioComponent} from './usuario.component';
import {UsuarioRoutingModule} from './usuario-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    UsuarioRoutingModule,
      
  ],
  declarations: [UsuarioComponent]
})
export class UsuarioModule { }
