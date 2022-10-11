import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiment } from 'src/app/model/experiment';
import { Deposition } from 'src/app/model/serviceresult';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';

@Component({
  selector: 'experiment-table',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {

  public loading: boolean;
  key:String
  public experiments: Deposition[];
  public selectedExperiment: Deposition;


  constructor(private router: Router, public dataService: DataService, public experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.loading = true;
    this.experimentService.getExperimentListFromZenodo().subscribe(
      experiments => {
        this.experiments = experiments;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  public showExperiment(): void {
    this.loading = true;
    this.experimentService.getExperimentFromZenodo(this.selectedExperiment.id, this.key).subscribe(
      json => {
        let experiment = new Experiment(json);
        this.dataService.setId(this.selectedExperiment.id);
        this.dataService.setZenodoLink(this.selectedExperiment.link);
        this.dataService.setCreationDate(new Date(this.selectedExperiment.date));
        this.showDashboard(experiment);
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }


  public loadProjectFromZenodo(){
    this.loading = true;
    this.experimentService.getProjectListFromZenodo(this.key).subscribe(
      experiments => {
        this.experiments = experiments;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
    console.log(this.key)


  }


  public showDashboard(experiment: Experiment): void {
    this.dataService.setExperiment(experiment);
    this.router.navigate(['./dashboard']);
  }

  public showError(error: any): void {
    console.log(error);
  }

}
