import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetalleRequisicionComponent} from'./detalle-requisicion.component';
import {FormsModule} from '@angular/forms';
import {DetalleRequisicionRoutingModule} from './detalle-requisicion-routing.module';


@NgModule({
  imports: [
    CommonModule,
    DetalleRequisicionRoutingModule,
    FormsModule,
    ],
  declarations: [DetalleRequisicionComponent]
})
export class DetalleRequisicionModule { }
