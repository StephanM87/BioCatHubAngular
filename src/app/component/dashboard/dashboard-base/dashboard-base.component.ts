import { Component, OnInit } from '@angular/core';
import { Experiment } from 'src/app/model/experiment';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.css']
})
export class DashboardBaseComponent implements OnInit {

  public experiment: Experiment;
  public id: string;
  public zenodoLink: string;
  public creationDate: Date;
  public measurementPlot: any;

  public showAlert = true;
  public loading: boolean;

  constructor(public dataService: DataService, public experimentService: ExperimentService) { 
    this.experiment = dataService.getExperiment();
    this.id = dataService.getId();
    this.zenodoLink = dataService.getZenodoLink();
    this.creationDate = dataService.getCreationDate();
    this.showAlert = false;
  }

  ngOnInit(): void {

  }

  public uploadToZenodo(): void {
    this.loading = true;
    this.experimentService.uploadExperimentToZenodo(this.experiment).subscribe(
      upload => {
        this.id = upload.id;
        this.zenodoLink = upload.zenodoLink;
        this.showAlert = true;
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    )
  }

  public exportEnzymeML(): void {
    this.loading = true;
    this.experimentService.createEnzymeML(this.experiment).subscribe(
      blob => {
        this.download(blob, 'experiment.omex');
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }

  public createPdf(): void {
    // TODO
  }

  public showError(error: any): void {
    console.log(error);
  }

  public download(blob: Blob, fileName: string): void {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
