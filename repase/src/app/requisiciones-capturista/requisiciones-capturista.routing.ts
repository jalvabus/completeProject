import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequisicionesCapturistaComponent} from './requisiciones-capturista.component';
export const routes: Routes = [
    
    {
        path:'',
        component:RequisicionesCapturistaComponent,
        data:{
            title:'Requisiciones'
        },
    }
    
    ];
    
    @NgModule({
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    })
    export class RequisicionesCapturistaRoutingModule{}