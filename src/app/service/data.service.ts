import { Injectable } from '@angular/core';
import { Enzyme, Reagent } from '../model/biocatalysis';
import { Experiment } from '../model/experiment';

@Injectable({ providedIn: 'root' })
export class DataService {

  experiment: Experiment;
  id: string;
  zenodoLink: string;
  date: Date;
  files: File[];

  constructor() { 
    this.date = new Date();
    this.experiment = new Experiment();
    this.experiment.enzymes = new Array<Enzyme>();
    this.experiment.reagents = new Array<Reagent>();
  }

  public getExperiment(): Experiment {
    return this.experiment;
  }

  public setExperiment(experiment: Experiment): void {
    this.experiment = experiment;
  }

  public getCreationDate(): Date {
    return this.date;
  }

  public setCreationDate(date: Date): void {
    this.date = date;
  }

  public getZenodoLink(): string {
    return this.zenodoLink;
  }

  public setZenodoLink(zenodoLink: string): void {
    this.zenodoLink = zenodoLink;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getFiles(): File[] {
    return this.files;
  }

}
