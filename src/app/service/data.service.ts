import { Injectable } from '@angular/core';
import { Enzyme, Measurement, Reactant, Reaction } from '../model/biocatalysis';
import { Experiment } from '../model/experiment';

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

@Injectable({ providedIn: 'root' })
export class DataService {

  experiment: Experiment;
  id: string;
  zenodoLink: string;
  date: Date;

  vesselValidation: string[];
  enzymeValidation: string[];
  reactantValidation: string[];
  conditionValidation: string[];
  measurementValidation: string[];

  constructor() { 
    this.date = new Date();
    this.experiment = new Experiment();
    this.experiment.enzymes = new Array<Enzyme>();
  }

  // Getter & Setter

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

  // Validation

  public validateExperiment(): void {
    this.validateEnzymes();
    this.validateReactants(); 
    this.validateVessel();
    this.validateReactionCondition();
    this.validateMeasurement();
  }

  public validateEnzymes(): void {
    this.enzymeValidation = new Array<string>();
    let enzymes = this.getExperiment().getEnzymes();
    if(!this.validateList(enzymes)) {
      enzymes.forEach(enzyme => {
        if(this.validateString(enzyme.name)) {
          this.enzymeValidation.push('name');
        }
        if(this.validateString(enzyme.sequence)) {
          this.enzymeValidation.push('sequence');
        }
        if(this.validateNumber(enzyme.concentration)) {
          this.enzymeValidation.push('concentration');
        }
        if(this.validateString(enzyme.unit)) {
          this.enzymeValidation.push('unit');
        }
        if(this.validateString(enzyme.formulation)) {
          this.enzymeValidation.push('formulation');
        }
        if(this.validateString(enzyme.method)) {
          this.enzymeValidation.push('method');
        }
        if(this.validateReaction(enzyme.reaction)) {
          this.enzymeValidation.push('reaction');
        }
      });
    } else {
      this.enzymeValidation.push('biokatalyst');
    }
  }

  public validateReaction(reaction: Reaction): boolean {
    let valid = false;
    if(reaction != undefined){
      valid = this.validateList(reaction.educts) ||
              this.validateList(reaction.products);
    }
    return valid;
  }

  public validateReactants(): void {
    this.reactantValidation = new Array<string>();
    this.getExperiment().getEnzymes().forEach(enzyme => {
      let reaction = enzyme.reaction;
      if(this.validateList(reaction.educts)){
        this.reactantValidation.push('substrates');
      } else {
        reaction.educts.forEach(educt => {
          this.validateReactant(educt);
        });
      }
      if(this.validateList(reaction.products)){
        this.reactantValidation.push('products');
      } else {
        reaction.products.forEach(product => {
          this.validateReactant(product);
        });
      }
    });
  }

  public validateReactant(reactant: Reactant): void {
    if(reactant != undefined){
      if(this.validateString(reactant.name) && !this.reactantValidation.includes('volume')) {
        this.reactantValidation.push('volume');
      }
      if(this.validateNumber(reactant.concentration) && !this.reactantValidation.includes('concentration')) {
        this.reactantValidation.push('concentration');
      }
      if(this.validateString(reactant.unit) && !this.reactantValidation.includes('unit')) {
        this.reactantValidation.push('unit');
      }
      if(this.validateString(reactant.role) && !this.reactantValidation.includes('role')) {
        this.reactantValidation.push('role');
      }
      if(this.validateString(reactant.formula) && !this.reactantValidation.includes('formula')) {
        this.reactantValidation.push('formula');
      }
    }
  }

  public validateVessel(): void {
    this.vesselValidation = new Array<string>();
    let vessel = this.getExperiment().getVessel();
    if(vessel != undefined) {
      if(this.validateString(vessel.type)) {
        this.vesselValidation.push('type');
      }
      if(this.validateNumber(vessel.volume)) {
        this.vesselValidation.push('volume');
      }
      if(this.validateString(vessel.unit)) {
        this.vesselValidation.push('unit');
      }
    }
  }

  public validateReactionCondition(): void {
    this.conditionValidation = new Array<string>();
    let condition = this.getExperiment().getReactionConditions();
    if(condition != undefined) {
      if(this.validateNumber(condition.temp)) {
        this.conditionValidation.push('temp');
      }
      if(this.validateString(condition.unit)) {
        this.conditionValidation.push('unit');
      }
      if(this.validateNumber(condition.ph)) {
        this.conditionValidation.push('ph');
      }
    }
  }

  public validateMeasurement(): void {
    this.measurementValidation = new Array<string>();
    this.getExperiment().getExperimentalData().measurements.forEach(measurement => {
      if(this.validateString(measurement.reagent) && !this.measurementValidation.includes('reactant')) {
        this.measurementValidation.push('reactant');
      }
      if(this.validateString(measurement.component) && !this.measurementValidation.includes('component')) {
        this.measurementValidation.push('component');
      }
      if(this.validateList(measurement.replicates) && !this.measurementValidation.includes('replicates')) {
        this.measurementValidation.push('replicates');
      }
    });
  }

  private validateString(value: string): boolean {
    return (value == undefined || value.trim().length == 0);
  }

  private validateNumber(value: number): boolean {
    return (value == undefined || value <= 0);
  }

  private validateList(list: any[]): boolean {
    return (list == undefined || list.length == 0);
  }

  // Methods

  public deleteMeasurement(measurement: Measurement): void {
    let index = this.experiment.experimentalData.measurements.indexOf(measurement);
    if (index !== -1) {
      this.experiment.experimentalData.measurements.splice(index, 1);
    }
  }

  public deleteReactant(reactants: Reactant[], reactant: Reactant) {
    const index: number = reactants.indexOf(reactant);
    if (index !== -1) {
      reactants.splice(index, 1);
    }
  }

  public getFormulaHtml(formula: string): string {
    let result = '';
    if(formula != undefined) {
      let cahracters = formula.split('');
      cahracters.forEach(char => {
        if (NUMBERS.includes(char)){
          result += '<sub>' + char + '</sub>'; 
        } else {
          result += char; 
        }
      });
    }
    return result;
  }

}
