import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import {RequisicionesComponent} from './requisiciones.component';
import {RequisicionesRoutingModule} from './requisiciones-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    RequisicionesRoutingModule,
      
  ],
  declarations: [RequisicionesComponent]
})
export class RequisicionesModule { }
