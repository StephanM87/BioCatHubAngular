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
  public measurementPlot: any;

  constructor(public dataService: DataService) {
    this.experiment = dataService.getExperiment();
    if(this.experiment.getMeasurement().replicates.length > 0){
      this.loadMeasurementImage();
    }
  }

  ngOnInit(): void {

  }

  public uploadToZenodo(): void {
    this.dataService.updateExperiment().subscribe(
      data => {
        // TODO: Zenodo ID anzeigen (Link generieren?)
      },
      error => {
        this.showError(error);
      }
    )
  }

  public exportEnzymeML(): void {
    this.dataService.createEnzymeML().subscribe(
      blob => {
        this.download(blob);
      },
      error => {
        this.showError(error);
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

  public download(blob: Blob): void {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl;
    a.download = 'archive.zip';
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
