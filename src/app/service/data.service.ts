import { Injectable } from '@angular/core';
import { Enzyme } from '../model/enzyme';
import { Reagent } from '../model/reagent'
import { analyzeAndValidateNgModules } from '@angular/compiler';

const TEST_ENZYMES: Enzyme[] = [
  {id: 1, enzymeName: "Enzyme A", aminoAcidSequence: "Amino Acid 1", concentration: "Concentraition 1", hostOrganism: "Host 1", productionOrganism: "Production 1", unit: "mmol/L"},
  {id: 2, enzymeName: "Enzyme B", aminoAcidSequence: "Amino Acid 2", concentration: "Concentraition 2", hostOrganism: "Host 2", productionOrganism: "Production 2", unit: "mmol/L"},
  {id: 3, enzymeName: "Enzyme C", aminoAcidSequence: "Amino Acid 3", concentration: "Concentraition 3", hostOrganism: "Host 3", productionOrganism: "Production 3", unit: "mmol/L"},
  {id: 4, enzymeName: "Enzyme D", aminoAcidSequence: "Amino Acid 4", concentration: "Concentraition 4", hostOrganism: "Host 4", productionOrganism: "Production 4", unit: "mmol/L"},
  {id: 5, enzymeName: "Enzyme E", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"}
];

const TEST_REAGENTS: Reagent[] = [
  {id: 1, reagentName: "Reagent A", concentration: "Concentraition 1", unit: "mmol/L", kind:"Substrate"},
  {id: 2, reagentName: "Reagent B", concentration: "Concentraition 2", unit: "mmol/L", kind:"Substrate"},
  {id: 3, reagentName: "Reagent C", concentration: "Concentraition 3", unit: "mmol/L", kind:"Substrate"},
  {id: 4, reagentName: "Reagent D", concentration: "Concentraition 4", unit: "mmol/L", kind:"Substrate"},
  {id: 5, reagentName: "Reagent E", concentration: "Concentraition 5", unit: "mmol/L", kind:"Substrate"}
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  enzymes: Enzyme[];
  reagents: Reagent[];

  constructor() { 
    this.enzymes = TEST_ENZYMES;
    this.reagents = TEST_REAGENTS;
  }

  // Enzyme Methods

  public getEnzymes(): Enzyme[] {
    return this.enzymes;
  }

  public getEnzyme(id: number): Enzyme {
    for(let enzyme of this.enzymes) {
      if(id == enzyme.id) {
        return enzyme;
      }
    }
  }

  public addEnzyme(newEnzyme: Enzyme): void {
    this.enzymes.push(newEnzyme);
  }

  public deleteEnzyme(id: number) {
    const index: number = this.enzymes.indexOf(this.getEnzyme(id));
    if (index !== -1) {
      this.enzymes.splice(index, 1);
    }
  }

  public updateEnzyme(newEnzyme: Enzyme): void {
    var enzyme = this.getEnzyme(newEnzyme.id);
    enzyme.enzymeName = newEnzyme.enzymeName;
    enzyme.aminoAcidSequence = newEnzyme.aminoAcidSequence;
    enzyme.concentration = newEnzyme.concentration;
    enzyme.hostOrganism = newEnzyme.hostOrganism;
    enzyme.productionOrganism = newEnzyme.productionOrganism;
    enzyme.unit = newEnzyme.unit;
  }

  public getNextEnzymeId(): number {
    var max: number = 1;
    for(let enzyme of this.enzymes) {
      if(enzyme.id > max) {
        max = enzyme.id;
      }
    }
    return max+1;
  }

  // Reagent Methods

  public getReagents(): Reagent[] {
    return this.reagents;
  }

  public getReagent(id: number): Reagent {
    for(let reagent of this.reagents) {
      if(id == reagent.id) {
        return reagent;
      }
    }
  }

  public addReagent(newReagent: Reagent): void {
    this.reagents.push(newReagent);
  }

  public deleteReagent(id: number) {
    const index: number = this.reagents.indexOf(this.getReagent(id));
    if (index !== -1) {
      this.reagents.splice(index, 1);
    }
  }

  public updateReagent(newReagent: Reagent): void {
    var reagent = this.getReagent(newReagent.id);
    reagent.reagentName = newReagent.reagentName;
    reagent.concentration = newReagent.concentration;
    reagent.unit = newReagent.unit;
    reagent.kind = newReagent.kind;
  }

  public getNextReagentId(): number {
    var max: number = 1;
    for(let reagent of this.reagents) {
      if(reagent.id > max) {
        max = reagent.id;
      }
    }
    return max+1;
  }

}
