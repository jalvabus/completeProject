import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario.component';
export const routes: Routes = [
    
    {
        path:'',
        component:UsuarioComponent,
        data:{
            title:'Usuario'
        },
    }
    
    ];
    
    @NgModule({
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    })
    export class UsuarioRoutingModule{}