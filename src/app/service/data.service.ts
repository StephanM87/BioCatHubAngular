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
    this.validateMeasurements();
  }

  public validateEnzymes(): void {
    this.enzymeValidation = new Array<string>();
    let enzymes = this.getExperiment().getEnzymes();
    if(!this.validateList(enzymes)) {
      enzymes.forEach(enzyme => {
        this.addToList(this.enzymeValidation, this.validateEnzyme(enzyme));
      });
    } else {
      this.enzymeValidation.push('biokatalyst');
    }
  }

  public validateEnzyme(enzyme: Enzyme): string[] {
    let enzymeErrors = new Array<string>();
    if(this.validateString(enzyme.name)) {
      enzymeErrors.push('name');
    }
    if(this.validateString(enzyme.type)) {
      enzymeErrors.push('type');
    } else if (enzyme.type == 'variant') {
      if(this.validateString(enzyme.variant)) {
        enzymeErrors.push('variant name');
      }
    }
    if(this.validateString(enzyme.organism)) {
      enzymeErrors.push('organism');
    }
    if(this.validateString(enzyme.sequence)) {
      enzymeErrors.push('sequence');
    }
    if(this.validateNumber(enzyme.concentration)) {
      enzymeErrors.push('concentration');
    }
    if(this.validateString(enzyme.unit)) {
      enzymeErrors.push('unit');
    }
    if(this.validateString(enzyme.formulation)) {
      enzymeErrors.push('formulation');
    }
    if(this.validateString(enzyme.method)) {
      enzymeErrors.push('method');
    }
    enzyme.others.forEach(attribute => {
      if(this.validateString(attribute.key)) {
        enzymeErrors.push('attribute name');
      }
      if(this.validateString(attribute.value)) {
        enzymeErrors.push('attribute value');
      }
    });
    return enzymeErrors;
  }

  public getEnzymeProgress(enzyme: Enzyme): number {
    let fields = 8;
    fields += (enzyme.type != undefined && enzyme.type == 'variant') ? 1 : 0;
    fields += (enzyme.others != undefined) ? (enzyme.others.length*2) : 0;
    let errors = this.validateEnzyme(enzyme).length;
    return this.getProgress(fields, errors);
  }

  public validateReactants(): void {
    this.reactantValidation = new Array<string>();
    this.getExperiment().getEnzymes().forEach(enzyme => {
      let reaction = enzyme.reaction;
      if(reaction == undefined) {
        this.reactantValidation.push('reaction');
      } else {
        if(this.validateList(reaction.educts)){
          this.reactantValidation.push('substrates');
        } else {
          reaction.educts.forEach(educt => {
            this.addToList(this.reactantValidation, this.validateReactant(educt));
          });
        }
        if(this.validateList(reaction.products)){
          this.reactantValidation.push('products');
        } else {
          reaction.products.forEach(product => {
            this.addToList(this.reactantValidation, this.validateReactant(product));
          });
        }
      }
    });
  }

  public validateReactant(reactant: Reactant): Array<string> {
    let reactantErrors = new Array<string>();
    if(reactant != undefined){
      if(this.validateString(reactant.name)) {
        reactantErrors.push('name');
      }
      if(this.validateNumber(reactant.concentration)) {
        reactantErrors.push('concentration');
      }
      if(this.validateString(reactant.unit)) {
        reactantErrors.push('unit');
      }
      if(this.validateString(reactant.role)) {
        reactantErrors.push('role');
      }
      if(this.validateString(reactant.purity)) {
        reactantErrors.push('purity');
      }
      if(this.validateString(reactant.supplier)) {
        reactantErrors.push('supplier');
      }
      if(this.validateString(reactant.formula)) {
        reactantErrors.push('formula');
      }
      if(this.validateString(reactant.smiles)) {
        reactantErrors.push('smiles');
      }
      if(reactant.others != undefined) {
        reactant.others.forEach(attribute => {
          if(this.validateString(attribute.key)) {
            reactantErrors.push('attribute name');
          }
          if(this.validateString(attribute.value)) {
            reactantErrors.push('attribute value');
          }
        });
      }
    }
    return reactantErrors;
  }

  public getReactantProgress(reactant: Reactant): number {
    let fields = 8;
    fields += (reactant.others != undefined) ? (reactant.others.length*2) : 0;
    let errors = this.validateReactant(reactant).length;
    return this.getProgress(fields, errors);
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
      vessel.others.forEach(attribute => {
        if(this.validateString(attribute.key)) {
          this.vesselValidation.push('attribute name');
        }
        if(this.validateString(attribute.value)) {
          this.vesselValidation.push('attribute value');
        }
      });
    }
  }

  public getVesselProgress(): number {
    let fields = 3;
    let vessel = this.experiment.vessel;
    fields += vessel.others ? vessel.others.length*2 : 0;
    this.validateVessel();
    let errors = this.vesselValidation.length;
    return this.getProgress(fields, errors);
  }

  public validateReactionCondition(): void {
    this.conditionValidation = new Array<string>();
    let condition = this.getExperiment().getReactionConditions();
    if(condition != undefined) {
      if(this.validateNumber(condition.temp.value)) {
        this.conditionValidation.push('temp');
      }
      if(this.validateString(condition.temp.unit)) {
        this.conditionValidation.push('unit');
      }
      let buffer = condition.buffer;
      if(buffer != undefined) {
        if(this.validateString(buffer.type)) {
          this.conditionValidation.push('buffer');
        }
        if(this.validateNumber(buffer.concentration)) {
          this.conditionValidation.push('puffer concentration');
        }
        if(this.validateString(buffer.unit)) {
          this.conditionValidation.push('buffer unit');
        }
      }
      condition.others.forEach(attribute => {
        if(this.validateString(attribute.key)) {
          this.conditionValidation.push('attribute name');
        }
        if(this.validateString(attribute.value)) {
          this.conditionValidation.push('attribute value');
        }
      });
    }
  }

  public getConditionProgress(): number {
    let fields = 6;
    let condition = this.experiment.condition;
    fields += condition.others ? condition.others.length*2 : 0;
    this.validateReactionCondition();
    let errors = this.conditionValidation.length;
    return this.getProgress(fields, errors);
  }

  public validateMeasurements(): void {
    this.measurementValidation = new Array<string>();
    if(this.getExperiment().getExperimentalData() != undefined && 
      this.getExperiment().getExperimentalData().measurements) {
        this.getExperiment().getExperimentalData().measurements.forEach(measurement => {
          this.addToList(this.measurementValidation, this.validateMeasurement(measurement));
        });
    }
  }

  public validateMeasurement(measurement: Measurement): Array<string> {
    let measurementErrors = new Array<string>();
    if(this.validateString(measurement.reagent)) {
      measurementErrors.push('reactant');
    }
    if(this.validateString(measurement.x_name)) {
      measurementErrors.push('x name');
    }
    if(this.validateString(measurement.x_unit)) {
      measurementErrors.push('x unit');
    }
    if(this.validateString(measurement.y_name)) {
      measurementErrors.push('y name');
    }
    if(this.validateString(measurement.y_unit)) {
      measurementErrors.push('x unit');
    }
    if(this.validateString(measurement.notes)) {
      measurementErrors.push('notes');
    }
    if(this.validateList(measurement.replicates)) {
      measurementErrors.push('replicates');
    }
    return measurementErrors;
  }

  public getMeasurementProgress(measurement: Measurement): number {
    let fields = 7;
    let errors = this.validateMeasurement(measurement).length;
    return this.getProgress(fields, errors);
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

  private addToList(list: string[], errors: string[]): void {
    errors.forEach(element => {
      if(!list.includes(element)){
        list.push(element);
      }
    });
  }

  private getProgress(fields: number, errors: number): number {
    let progress = ((fields - errors) / fields) * 100;
    return progress;
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
