import { Injectable } from '@angular/core';
import { Enzyme, Reagent, Replicate, Vessel } from '../model/biocatalysis';
import { Experiment} from '../model/experiment';
import { User } from '../model/user';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const TEST_ENZYMES: Enzyme[] = [
  {id: 1, name: "Enzyme A", sequence: "Sequence 1", concentration: 1, unit: "mmol/L", boundary: false, constant: false},
  {id: 2, name: "Enzyme B", sequence: "Sequence 2", concentration: 2, unit: "mmol/L", boundary: false, constant: false},
  {id: 3, name: "Enzyme C", sequence: "Sequence 3", concentration: 3, unit: "mmol/L", boundary: false, constant: false},
  {id: 4, name: "Enzyme D", sequence: "Sequence 4", concentration: 4, unit: "mmol/L", boundary: false, constant: false},
  {id: 5, name: "Enzyme E", sequence: "Sequence 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false}
];

const TEST_REAGENTS: Reagent[] = [
  {id: 1, reagentName: "Reagent A", concentration: "Concentraition 1", unit: "mmol/L", kind:"Substrate"},
  {id: 2, reagentName: "Reagent B", concentration: "Concentraition 2", unit: "mmol/L", kind:"Substrate"},
  {id: 3, reagentName: "Reagent C", concentration: "Concentraition 3", unit: "mmol/L", kind:"Substrate"},
  {id: 4, reagentName: "Reagent D", concentration: "Concentraition 4", unit: "mmol/L", kind:"Substrate"},
  {id: 5, reagentName: "Reagent E", concentration: "Concentraition 5", unit: "mmol/L", kind:"Substrate"}
];

const TEST_USER: User = new User({firstName: 'Max', lastName: 'Mustermann', email: 'max@mustermann.de', institution: 'FZ Jülich', orcid: '4711'});

@Injectable({
  providedIn: 'root'
})
export class DataService {

  experiment: Experiment;
  user: User;

  constructor() { 
    this.experiment = new Experiment();
    this.experiment.enzymes = TEST_ENZYMES;
    this.experiment.reagents = TEST_REAGENTS;
    this.user = TEST_USER;
  }

  public getExperiment(): Experiment {
    return this.experiment;
  }

  public getUser(): User {
    return this.user;
  }

}
