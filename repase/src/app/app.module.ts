import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { FormsModule }   from '@angular/forms';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';



//services
import {PiezaService} from './servicios/pieza.service';
import {HttpModule} from '@angular/http';
import {ProveedorService} from './servicios/proveedor.service';
import { RequisicionService } from './servicios/requisicion.service';
import {UsuarioService} from './servicios/usuario.service';
import {LoginService} from './servicios/login.service';
import {ClienteService} from './servicios/cliente.service';
import {AuthGuardService} from './servicios/auth-guard.service';
import {AuthServiceService} from './servicios/auth-service.service';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    
    

    
  ],
  providers: [PiezaService,
    ProveedorService,
    RequisicionService,
    UsuarioService,LoginService,
    ClienteService,
    AuthGuardService,
    AuthServiceService,
    
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy, 
    

  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
