import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HistorialComponent} from './historial.component';
export const routes: Routes = [

{
    path:'',
    component:HistorialComponent,
    data:{
        title:'Historial'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HitorialRoutingModule{}