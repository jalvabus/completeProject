import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClienteComponent} from './cliente.component';
export const routes: Routes = [

{
    path:'',
    component:ClienteComponent,
    data:{
        title:'Cliente'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ClienteRoutingModule{}