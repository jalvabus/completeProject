import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntradaRequisicionComponent} from './entrada-requisicion.component';
import {EntradaRequisicionRoutingModule} from './entrada-requisicion-routing.module';
import {FormsModule} from '@angular/forms';
  

@NgModule({
  imports: [
    CommonModule,
    EntradaRequisicionRoutingModule,
    FormsModule

  ],
  declarations: [EntradaRequisicionComponent]
})
export class EntradaRequisicionModule { }
