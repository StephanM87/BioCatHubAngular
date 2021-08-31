import { Component, OnInit, Input } from '@angular/core';
import  { DataService } from "../../../../service/data.service"

@Component({
  selector: 'app-aqueous-solvent',
  templateUrl: './aqueous-solvent.component.html',
  styleUrls: ['./aqueous-solvent.component.css']
})
export class AqueousSolventComponent implements OnInit {

  @Input() solvent
  constructor(private data:DataService) { }

  ngOnInit(): void {
  }


  getReaction(){
    let org = [{type:"name", concentration:3, unit:"mmol/L"}]
    return org
  }

  getExperiment(){
    return this.data.getExperiment()
  }

}
