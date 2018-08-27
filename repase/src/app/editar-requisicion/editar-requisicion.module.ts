import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditarRequisicionComponent } from './editar-requisicion.component';
import {FormsModule} from '@angular/forms'
import {EditarRequisicionRoutingModule} from './editar-requisicion.routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditarRequisicionRoutingModule
],
  declarations: [EditarRequisicionComponent]
})
export class EditarRequisicionModule { }
