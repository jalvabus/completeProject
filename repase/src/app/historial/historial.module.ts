import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HistorialComponent} from './historial.component';
import {HitorialRoutingModule} from './historial.routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HitorialRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HistorialComponent]
})
export class HistorialModule { }
