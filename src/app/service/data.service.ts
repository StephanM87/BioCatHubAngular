import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  {id: 1, name: "Reagent A", concentration: 1, unit: "mmol/L", boundary: false, constant: false},
  {id: 2, name: "Reagent B", concentration: 2, unit: "mmol/L", boundary: false, constant: false},
  {id: 3, name: "Reagent C", concentration: 3, unit: "mmol/L", boundary: false, constant: false},
  {id: 4, name: "Reagent D", concentration: 4, unit: "mmol/L", boundary: false, constant: false},
  {id: 5, name: "Reagent E", concentration: 5, unit: "mmol/L", boundary: false, constant: false}
];

const TEST_ENZYME_LIST: Enzyme[] = [
  {id: 101, name: "alcohol dehydrogenase", sequence: "Amino Acid 1", concentration: 1, unit: "mmol/L", boundary: false, constant: false},
  {id: 102, name: "alcohol dehydrogenase (NADP+)", sequence: "Amino Acid 2", concentration: 2, unit: "mmol/L", boundary: false, constant: false},
  {id: 103, name: "(S)-specific secondary alcohol dehydrogenase", sequence: "Amino Acid 3", concentration: 3, unit: "mmol/L", boundary: false, constant: false},
  {id: 104, name: "homoserine dehydrogenase", sequence: "Amino Acid 4", concentration: 4, unit: "mmol/L", boundary: false, constant: false},
  {id: 105, name: "(R)-specific secondary alcohol dehydrogenase (NADH)", sequence: "Amino Acid 5", concentration: 4, unit: "mmol/L", boundary: false, constant: false},
  {id: 106, name: "(R,R)-butanediol dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 107, name: "acetoin dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 108, name: "glycerol dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 109, name: "propanediol-phosphate dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 110, name: "glycerol-3-phosphate dehydrogenase (NAD+)", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 111, name: "D-xylulose reductase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 112, name: "L-xylulose reductase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 113, name: "D-arabinitol 4-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 114, name: "L-arabinitol 4-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 115, name: "L-arabinitol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 116, name: "L-iditol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 117, name: "D-iditol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false},
  {id: 118, name: "galactitol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: 5, unit: "mmol/L", boundary: false, constant: false}
];

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://127.0.0.1:5000/api';

  experiment: Experiment;
  user: User;
  enzymeSearchList: Enzyme[];

  constructor(private client: HttpClient) { 
    this.experiment = new Experiment();
    this.user = new User();
    this.experiment.enzymes = TEST_ENZYMES;
    this.experiment.reagents = TEST_REAGENTS;
    this.enzymeSearchList = TEST_ENZYME_LIST;
  }

  public getExperiment(): Experiment {
    return this.experiment;
  }

  public getUser(): User {
    return this.user;
  }

  public getEnzymeList(){
    return this.enzymeSearchList;
  }

  getEnzymeSearchList() {
    this.client.get<Enzyme[]>('/enzymes').subscribe(
      data => {
        this.enzymeSearchList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEnzymeSpecification(id: string) {
    this.client.get<Enzyme>('/enzyme/' + id).subscribe(
      data => {
        
      },
      error => {
        console.log(error);
      }
    );
  }

  createEnzymeML(){
    this.client.post('/enzymeml', this.experiment, httpOptions).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    );
  }

  getExperimentFromZenodo(id: string) {
    this.client.get<Experiment>('/experiment/' + id).subscribe(
      data => {
        this.experiment = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getExperimentFromFile() {
    this.client.post<Experiment>('/experiment', httpOptions).subscribe(
      data => {
        this.experiment = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
