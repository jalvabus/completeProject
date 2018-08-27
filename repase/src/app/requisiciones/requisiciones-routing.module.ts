import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequisicionesComponent} from './requisiciones.component';
export const routes: Routes = [
    
    {
        path:'',
        component:RequisicionesComponent,
        data:{
            title:'Requisiciones'
        },
    }
    
    ];
    
    @NgModule({
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    })
    export class RequisicionesRoutingModule{}