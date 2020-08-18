import { Component, OnInit } from '@angular/core';
import { Enzyme, Reagent, Vessel, Replicate } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import { Experiment } from 'src/app/model/experiment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public experiment: Experiment;

  constructor(public dataService: DataService) {
    this.experiment = dataService.getExperiment();
  }

  ngOnInit(): void {

  }

}
