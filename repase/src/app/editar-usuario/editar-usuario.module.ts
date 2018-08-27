import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditarUsuarioComponent} from './editar-usuario.component';
import {EditarUsuarioRoutingModule} from './editar-usuario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EditarUsuarioRoutingModule,
    FormsModule
  ],
  declarations: [EditarUsuarioComponent]
})
export class EditarUsuarioModule { }
