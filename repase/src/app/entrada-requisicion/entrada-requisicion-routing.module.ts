import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EntradaRequisicionComponent} from './entrada-requisicion.component';
export const routes: Routes = [

{
    path:'',
    component:EntradaRequisicionComponent,
    data:{
        title:'Requisicion'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EntradaRequisicionRoutingModule{}