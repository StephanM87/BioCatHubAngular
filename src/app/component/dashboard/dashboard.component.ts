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

  public upload(): void {
    this.dataService.updateExperiment().subscribe(
      data => {
        // TODO: Zenodo ID anzeigen (Link generieren?)
      },
      error => {
        this.showError(error);
      }
    )
  }

  public export(): void {
    this.dataService.createEnzymeML().subscribe(
      blob => {
        this.download(blob);
      },
      error => {
        this.showError(error);
      }
    );
  }

  public createPDF(): void {
    // TODO
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

}
