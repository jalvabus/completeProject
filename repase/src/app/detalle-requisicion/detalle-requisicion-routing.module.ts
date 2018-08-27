import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DetalleRequisicionComponent} from './detalle-requisicion.component';
export const routes: Routes = [

{
    path:'',
    component:DetalleRequisicionComponent,
    data:{
        title:'Detalle Requisicion'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DetalleRequisicionRoutingModule{}