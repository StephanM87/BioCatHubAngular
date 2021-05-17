import { Injectable } from '@angular/core';

import { DataService } from 'src/app/service/data.service';

import { AdditionalExperiment } from './additional-experiment-model';
import { Replicate } from 'src/app/model/biocatalysis';
import { Experiment } from 'src/app/model/experiment';
import { TemperatureUnitDropdown, ConcentrationUnitDropdown } from 'src/properties/dropdown';

@Injectable({
  providedIn: 'root'
})
export class AdditionalExperimentService {
  additionalExperiments: Array<AdditionalExperiment>;
  experiment: Experiment;
  reactants: Array<string>;
  parameters: Array<string>;
  units: Array<string>;

  constructor(public dataService: DataService) {
    this.additionalExperiments = new Array<AdditionalExperiment>();
    this.experiment = this.dataService.getExperiment();
   }

/* Functions to handle, create and delete additional experiments */
  public getAdditionalExperiments(): Array<AdditionalExperiment> {
    return this.experiment.additionalExperiments;
  }

  public newAdditionalExperiment(): void {
    let additionalExperiment = new AdditionalExperiment();
    additionalExperiment.parameter.value = undefined;
    let replica = new Replicate();
    replica.y_values = new Array<number>(3);
    additionalExperiment.measurement.replicates.push(replica);
    this.getAdditionalExperiments().push(additionalExperiment);
  }

  public deleteAdditionalExperiment(additionalExperiment: AdditionalExperiment): void {
    let index = this.additionalExperiments.indexOf(additionalExperiment);
    if (index !== -1) {
      this.additionalExperiments.splice(index, 1);
    }
  }

  public createFullExperimentFromAdditionalExperiment(additionalExperiment: AdditionalExperiment, initialExperiment: Experiment): Experiment {
  /* Take additional experiment and transform it in Experiment Data Model to use it further */
    let experiment = initialExperiment;
    /* Search changed parameter and set new value and unit*/
    switch (additionalExperiment.parameter.name) {
      case "concentration": 
        /* Search for right reactant and set value and unit*/
        for(let enzyme of experiment.getEnzymes()) {
          if (enzyme.name == additionalExperiment.parameter.reactant) {
            enzyme.concentration = additionalExperiment.parameter.value;
            enzyme.unit = additionalExperiment.parameter.unit;
            break;
          }
          for(let reactant of enzyme.reaction.educts) {      
            if (reactant.name == additionalExperiment.parameter.reactant) {
              reactant.concentration = additionalExperiment.parameter.value;
              reactant.unit = additionalExperiment.parameter.unit;
              break;
            }
          }
          for(let reactant of enzyme.reaction.products) {
            if (reactant.name == additionalExperiment.parameter.reactant) {
              reactant.concentration = additionalExperiment.parameter.value;
              reactant.unit = additionalExperiment.parameter.unit;
              break;
            }
          }
        }
        break;
      case "temperature":
        experiment.condition.temp = additionalExperiment.parameter.value;
        break;
      case "pH value":
        experiment.condition.ph = additionalExperiment.parameter.value;
        break;
    }
    /* Reset Measurement Data */
    experiment.experimentalData.measurements = [additionalExperiment.measurement];
    experiment.title = additionalExperiment.title;
    return experiment;
  }

/* Set dropdown lists for reactants, parameters and units */
  public setReactantList(initialExperiment): Array<string> {
    this.reactants = new Array<string>();
    initialExperiment.getEnzymes().forEach(enzyme => {
      this.reactants.push(enzyme.name);
      enzyme.reaction.educts.forEach(reactant => {
        this.reactants.push(reactant.name);
      });
      enzyme.reaction.products.forEach(reactant => {
        this.reactants.push(reactant.name);
      });
    });
    return this.reactants;
  }

  public setParameterList(): Array<string> {
    this.parameters = new Array<string>();
    this.parameters.push("concentration");
    this.parameters.push("temperature");
    this.parameters.push("pH value");
    return this.parameters;
  }

  public setUnitList(parameter): Array<string> {
    this.units = new Array<string>();
    switch (parameter) {
      case "concentration": 
        this.units = ConcentrationUnitDropdown;
        break;
      case "temperature":
        this.units = TemperatureUnitDropdown;
        break;
      case "pH value":
        this.units = [];
        break;
      default:
        this.units = [];
    }
    return this.units;
  }

/* Functions to handle measurement data */
  public addReplicate(measurement): void {
    measurement.replicates.forEach(replica => {
      replica.y_values.push(undefined);
    });
  }

  public removeReplicate(measurement): void {
    if(this.getReplicaCount(measurement.replicates) > 1){
      measurement.replicates.forEach(replica => {
        replica.y_values.pop();
      });
    } else {
      measurement.replicates.forEach(replica => {
        replica.y_values[0] = undefined;
      });
    }
  }

  public addValues(measurement): void {
    let replica = new Replicate();
    replica.y_values = new Array<number>(this.getReplicaCount(measurement.replicates));
    measurement.replicates.push(replica);
  }

  public deleteValues(measurement): void {
    if(measurement.replicates.length > 1) {
      measurement.replicates.pop();
    } else {
      let replica = new Replicate();
      replica.y_values = new Array<number>(3);
      measurement.replicates = new Array<Replicate>();
      measurement.replicates.push(replica);
    }
  }

  getReplicaCount(replicates): number {
    if(replicates.length > 0) {
      return replicates[0].y_values.length;
    }
    return 0;
  }

}
