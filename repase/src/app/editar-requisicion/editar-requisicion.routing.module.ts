import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditarRequisicionComponent} from './editar-requisicion.component';
export const routes: Routes = [

{
    path:'',
    component:EditarRequisicionComponent,
    data:{
        title:'Editar-Requisicion'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EditarRequisicionRoutingModule{}