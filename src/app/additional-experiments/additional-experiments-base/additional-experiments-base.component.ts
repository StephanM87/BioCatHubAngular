import { Component, OnInit } from '@angular/core';

import { AdditionalExperimentService } from '../additional-experiment.service';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';
import { AdditionalExperiment } from '../additional-experiment-model';
import { Experiment } from 'src/app/model/experiment';

@Component({
  selector: 'app-additional-experiments-base',
  templateUrl: './additional-experiments-base.component.html',
  styleUrls: ['./additional-experiments-base.component.css']
})
export class AdditionalExperimentsBaseComponent implements OnInit {

  public initialExperiment: Experiment;
  public additionalExperiment: AdditionalExperiment;

  public id: string;
  public loading: boolean;
  public zenodoLink: string;
  public showAlert = true;

  constructor(public additionalExperimentService: AdditionalExperimentService,
              public dataService: DataService,
              public experimentService: ExperimentService) {
    this.id = dataService.getId();
    this.zenodoLink = dataService.getZenodoLink();
  }

  ngOnInit(): void {
    this.initialExperiment = this.dataService.getExperiment();
  }

/* Functions to handle, create and delete additional experiments */
  public getAdditionalExperiments(): Array<AdditionalExperiment> {
    return this.additionalExperimentService.getAdditionalExperiments();
  }

  public newAdditionalExperiment(): void {
    this.additionalExperimentService.newAdditionalExperiment();
  }

  public deleteAll(): void {
    this.getAdditionalExperiments().splice(0, this.getAdditionalExperiments().length);
  }

/* Zenodo */
  public uploadAllToZenodo(): void {
    this.getAdditionalExperiments().forEach(additionalexperiment => {
      this.uploadToZenodo(additionalexperiment);
    });
  }

  public uploadToZenodo(additionalexperiment: AdditionalExperiment): void {
    this.loading = true;
    this.experimentService.uploadExperimentToZenodo(
      this.additionalExperimentService.createFullExperimentFromAdditionalExperiment(additionalexperiment, this.initialExperiment)).subscribe(
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

/* EnzymeML */
  public exportAllEnzymeML(): void {
    this.getAdditionalExperiments().forEach(additionalexperiment => {
      this.exportEnzymeML(additionalexperiment);
    });
  }
  
  public exportEnzymeML(additionalexperiment: AdditionalExperiment): void {
    this.loading = true;
    this.experimentService.createEnzymeML(
      this.additionalExperimentService.createFullExperimentFromAdditionalExperiment(additionalexperiment, this.initialExperiment)).subscribe(
      blob => {
        this.download(blob, 'additionalexperiment.omex');
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }

/* PDF */
  public createAllPdf(): void {
    /*for Schleife über alle additionalexperiments und einzelne 
      Funktion jeweils dafür aufrufen*/
    this.getAdditionalExperiments().forEach(additionalexperiment => {
      this.createPdf(additionalexperiment);
    });
  }

  public createPdf(additionalexperiment: AdditionalExperiment): void {
    /** TO DO ähnlich wie in dashboard-base component
      * dafür mit createFullExperimentFromAdditionalExperiment()*/
  }
   
/* Template file */
  public templateFile(): void {
    this.loading = true;
    this.additionalExperimentService.templateFile().subscribe(
      blob => {
        this.download(blob, 'template.xlsx');
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  showError(error: any): void {
    console.log(error);
  }

  download(blob: Blob, fileName: string): void {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}