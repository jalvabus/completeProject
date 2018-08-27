import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MarcaComponent} from './marca.component';
import {MarcaRoutingModule} from './marca-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarcaRoutingModule
  ],
  declarations: [MarcaComponent]
})
export class MarcaModule { }
