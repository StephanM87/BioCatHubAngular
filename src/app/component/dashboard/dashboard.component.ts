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
  public id: string;
  public zenodoLink: string;
  public creationDate: Date;
  public measurementPlot: any;

  public description: string;

  public showAlert = true;
  public loading: boolean;

  constructor(public dataService: DataService) {
    this.experiment = dataService.getExperiment();
    this.id = dataService.getId();
    this.zenodoLink = dataService.getZenodoLink();
    this.creationDate = dataService.getCreationDate();
    if(this.experiment.getMeasurement().replicates.length > 0){
      this.loadMeasurementImage();
    }
    this.showAlert = false;
  }

  ngOnInit(): void {

  }

  public uploadToZenodo(): void {
    this.loading = true;
    this.dataService.uploadExperiment().subscribe(
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
    this.dataService.createEnzymeML().subscribe(
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

  public shareExperiment(): void {
    
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

  public loadMeasurementImage(): void {
    this.dataService.plotMeasurement().subscribe(
      blob => {
        this.measurementPlot = this.createImageFromBlob(blob);
      },
      error => {
        this.showError(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.measurementPlot = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
