import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MarcaComponent} from './marca.component';
export const routes: Routes = [

{
    path:'',
    component:MarcaComponent,
    data:{
        title:'Marca'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MarcaRoutingModule{}