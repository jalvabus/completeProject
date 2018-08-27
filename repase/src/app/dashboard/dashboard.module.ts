import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PiezaComponent} from '.././piezas/pieza.component';
import {FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,FormsModule,
    CommonModule,
    Ng2SearchPipeModule
  ],
  declarations: [ DashboardComponent,PiezaComponent ]
})
export class DashboardModule { }
