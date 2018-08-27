import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ChartsModule
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }
