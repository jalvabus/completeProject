import { Component, OnInit } from '@angular/core';
import {RequisicionService} from '.././servicios/requisicion.service';

@Component({
  selector: 'app-requisiciones-capturista',
  templateUrl: './requisiciones-capturista.component.html',
  styleUrls: ['./requisiciones-capturista.component.css']
})
export class RequisicionesCapturistaComponent implements OnInit {
  requisiciones:any=[]
folio:any={}
  constructor(private requisicionService:RequisicionService) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData(){
    this.requisicionService.verRequisicionesCapturista()
    .then((requisiciones)=>{
      this.requisiciones=requisiciones;
    })
  }

}
