import { Injectable } from '@angular/core';
import { Enzyme } from '../model/enzyme';
import { Reagent } from '../model/reagent'

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

  public getEnzymes(): Enzyme[] {
    return this.enzymes;
  }

  public getReagents(): Reagent[] {
    return this.reagents;
  }

}
