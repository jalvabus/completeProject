import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {PiezaComponent} from '../piezas/pieza.component';


const routes: Routes = [
  {
    path: '',
    component: PiezaComponent,
    data: {
      title: 'Piezas'
    },
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
