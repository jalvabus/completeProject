import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './servicios/auth-guard.service';

export const routes: Routes = [

{
    path:'',
    redirectTo:'editarUsuario',
    pathMatch:'full'

},
{
    path:'',
    component:FullLayoutComponent,
    canActivate:[AuthGuardService],
    data:{
        title:'Inicio'
    },
    children:[
        {
            path:'pieza',
            loadChildren:'./dashboard/dashboard.module#DashboardModule'
        },
        {
            path:'pieza/:id',
            loadChildren:'./dashboard/dashboard.module#DashboardModule'
        },
        {
            path:'proveedores',
            loadChildren:'./proveedores/proveedores.module#ProveedoresModule'
        },
        {
            path:'proveedor/:id',
            loadChildren:'./proveedores/proveedores.module#ProveedoresModule'
        },
        {
            path:'requisicionEntrada',
            loadChildren:'./entrada-requisicion/entrada-requisicion.module#EntradaRequisicionModule'
        },
        {
            path:'requisiciones',
            loadChildren:'./requisiciones/requisiciones.module#RequisicionesModule'
        },
        {
            path:'cliente',
            loadChildren:'./cliente/cliente.module#ClienteModule'
        },
        {
            path:'detalleRequisicion/:id',
            loadChildren:'./detalle-requisicion/detalle-requisicion.module#DetalleRequisicionModule'
        },
        {
            path:'usuario',
            loadChildren:'./usuario/usuario.module#UsuarioModule'
        },
        {
            path:'editarUsuario',
            loadChildren:'./editar-usuario/editar-usuario.module#EditarUsuarioModule'
        },
        {
            path:'cliente/:id',
            loadChildren:'./cliente/cliente.module#ClienteModule'
        },
        {
            path:'requisicionesCapt',
            loadChildren:'./requisiciones-capturista/requisiciones-capturista.module#RequisicionesCapturistaModule'
        },
        {
            path:'editarRequisicion/:id',
            loadChildren:'./editar-requisicion/editar-requisicion.module#EditarRequisicionModule'
        },
        {
            path:'marca',
            loadChildren:'./marca/marca.module#MarcaModule'
        },
        {
            path:'historial',
            loadChildren:'./historial/historial.module#HistorialModule'
        },

        
    ]

},
{
    path:'login',
    component:LoginComponent,
    data:{
        title:'Login'
    }

}

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}