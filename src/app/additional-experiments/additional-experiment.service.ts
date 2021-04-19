import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AdditionalExperiment } from './additional-experiment-model';
import { environment } from 'src/environments/environment';
import { Replicate } from 'src/app/model/biocatalysis';
import { Experiment } from 'src/app/model/experiment';
import { TemperatureUnitDropdown, ConcentrationUnitDropdown } from 'src/properties/dropdown';

@Injectable({
  providedIn: 'root'
})
export class AdditionalExperimentService {
  additionalExperiments: Array<AdditionalExperiment>;
  reactants: Array<string>;
  parameters: Array<string>;
  units: Array<string>;

  constructor(private client: HttpClient) {
    this.additionalExperiments = new Array<AdditionalExperiment>();
   }

/* Functions to handle, create and delete additional experiments */
  public getAdditionalExperiments(): Array<AdditionalExperiment> {
    return this.additionalExperiments;
  }

  public newAdditionalExperiment(): void {
    let additionalExperiment = new AdditionalExperiment();
    additionalExperiment.changedvalue = undefined;
    let replica = new Replicate();
    replica.y_values = new Array<number>(3);
    additionalExperiment.measurement.replicates.push(replica);
    this.getAdditionalExperiments().push(additionalExperiment);
  }

  public deleteAdditionalExperiment(additionalexperiment: AdditionalExperiment): void {
    let index = this.additionalExperiments.indexOf(additionalexperiment);
    if (index !== -1) {
      this.additionalExperiments.splice(index, 1);
    }
  }

  public createFullExperimentFromAdditionalExperiment(additionalexperiment: AdditionalExperiment, initialExperiment: Experiment): Experiment {
  /* Take additional experiment and transform it in Experiment Data Model to use it further */
    let experiment = initialExperiment;
    /* Search changed parameter and set new value and unit*/
    switch (additionalexperiment.changedparameter) {
      case "concentration": 
        /* Search for right reactant and set value and unit*/
        for(let enzyme of experiment.getEnzymes()) {
          if (enzyme.name == additionalexperiment.reactantofparameter) {
            enzyme.concentration = additionalexperiment.changedvalue;
            enzyme.unit = additionalexperiment.unit;
            break;
          }
          for(let reactant of enzyme.reaction.educts) {      
            if (reactant.name == additionalexperiment.reactantofparameter) {
              reactant.concentration = additionalexperiment.changedvalue;
              reactant.unit = additionalexperiment.unit;
              break;
            }
          }
          for(let reactant of enzyme.reaction.products) {
            if (reactant.name == additionalexperiment.reactantofparameter) {
              reactant.concentration = additionalexperiment.changedvalue;
              reactant.unit = additionalexperiment.unit;
              break;
            }
          }
        }
        break;
      case "temperature":
        experiment.condition.temp = additionalexperiment.changedvalue;
        break;
      case "pH value":
        experiment.condition.ph = additionalexperiment.changedvalue;
        break;
    }
    /* Reset Measurement Data */
    experiment.experimentalData.measurements = [additionalexperiment.measurement];
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

  public setUnitList(changedparameter): Array<string> {
    this.units = new Array<string>();
    switch (changedparameter) {
      case "concentration": 
        this.units = ConcentrationUnitDropdown;
        break;
      case "temperature":
        this.units = TemperatureUnitDropdown;
        break;
      case "pH value":
        this.units = [];
        break;
    }
    return this.units;
  }

/*  Download template file  */
  templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/measurement/template', {responseType: 'blob'});
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
