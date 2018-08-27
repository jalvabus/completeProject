import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClienteComponent} from'./cliente.component';
import {ClienteRoutingModule} from './cliente-routing.module';
import {FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [ClienteComponent]
})
export class ClienteModule { }
