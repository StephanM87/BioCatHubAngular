import { Component, OnInit } from '@angular/core';
import { Vessel } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  // Vessel
  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }

}
