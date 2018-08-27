import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProveedorComponent} from './proveedor.component';
import {ProveedoresRoutingModule} from './proveedores-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    FormsModule
  ],
  declarations: [ProveedorComponent]
})
export class ProveedoresModule { }
