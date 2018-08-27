import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisicionesCapturistaRoutingModule} from './requisiciones-capturista.routing';
import {FormsModule} from '@angular/forms';
import {RequisicionesCapturistaComponent} from './requisiciones-capturista.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    RequisicionesCapturistaRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [RequisicionesCapturistaComponent]
})
export class RequisicionesCapturistaModule {}
