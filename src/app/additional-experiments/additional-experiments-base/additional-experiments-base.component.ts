import { Component, OnInit } from '@angular/core';

import { AdditionalExperimentService } from '../additional-experiment.service';
import { ClientService } from '../client.service';
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
  public id: string;
  public loading: boolean;
  public zenodoLink: string;
  public showAlert = true;

  constructor(public additionalExperimentService: AdditionalExperimentService,
              public dataService: DataService,
              public experimentService: ExperimentService,
              public clientService: ClientService) {
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

  public deleteAdditionalExperiment(additionalExperiment: AdditionalExperiment): void {
    this.additionalExperimentService.deleteAdditionalExperiment(additionalExperiment);
  }

/* Zenodo */
  public uploadAllToZenodo(): void {
    this.getAdditionalExperiments().forEach(additionalExperiment => {
      this.uploadToZenodo(additionalExperiment);
    });
  }

  public uploadToZenodo(additionalExperiment: AdditionalExperiment): void {
    this.loading = true;
    this.clientService.uploadExperimentToZenodo(
      this.additionalExperimentService.createFullExperimentFromAdditionalExperiment(additionalExperiment, this.initialExperiment)).subscribe(
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
    this.getAdditionalExperiments().forEach(additionalExperiment => {
      this.exportEnzymeML(additionalExperiment);
    });
  }
  
  public exportEnzymeML(additionalExperiment: AdditionalExperiment): void {
    this.loading = true;
    this.clientService.createEnzymeML(
      this.additionalExperimentService.createFullExperimentFromAdditionalExperiment(additionalExperiment, this.initialExperiment)).subscribe(
      blob => {
        this.download(blob, 'additionalExperiment.omex');
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
    this.getAdditionalExperiments().forEach(additionalExperiment => {
      this.createPdf(additionalExperiment);
    });
  }

  public createPdf(additionalExperiment: AdditionalExperiment): void {
    /** TO DO ähnlich wie in dashboard-base component
      * dafür mit createFullExperimentFromAdditionalExperiment()
      * und über ClientService laufen lassen */
  }
   
/* download and error */
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