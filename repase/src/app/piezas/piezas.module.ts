import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PiezaComponent} from './pieza.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [PiezaComponent]
})
export class PiezasModule { }
