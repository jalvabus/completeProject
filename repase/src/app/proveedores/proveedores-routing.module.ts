import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProveedorComponent} from './proveedor.component';
export const routes: Routes = [

{
    path:'',
    component:ProveedorComponent,
    data:{
        title:'Proveedores'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProveedoresRoutingModule{}