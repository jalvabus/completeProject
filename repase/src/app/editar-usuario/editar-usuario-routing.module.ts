import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditarUsuarioComponent} from './editar-usuario.component';
export const routes: Routes = [

{
    path:'',
    component:EditarUsuarioComponent,
    data:{
        title:'Editar-Usuario'
    },
}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EditarUsuarioRoutingModule{}