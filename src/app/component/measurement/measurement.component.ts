import { Component, OnInit } from '@angular/core';
import { Vessel } from 'src/app/model/biocatalysis';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  public vessel: Vessel;

  constructor(public dataService: DataService) {
    this.vessel = dataService.getExperiment().getVessel();
   }

  ngOnInit(): void {
  }

  public submit(): void {

  }

}
