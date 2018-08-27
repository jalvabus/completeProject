import { Component, OnInit,ViewChild } from '@angular/core';
import { RequisicionService } from '../servicios/requisicion.service';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styleUrls: ['./requisiciones.component.css']
})
export class RequisicionesComponent {
  requisiciones: any = []
  
  constructor(public requisicionService:RequisicionService) {
    this.getData();
   }

  ngOnInit() {
  }

  


  getData() {
    this.requisicionService.verRequisiciones()
      .then((requisiciones) => {
        console.log(requisiciones)
        this.requisiciones = requisiciones;
      })
    
  }


}
