import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Enzyme, Reagent, Replicate, Vessel, EnzymeSearch } from '../model/biocatalysis';
import { Experiment} from '../model/experiment';
import { User } from '../model/user';
import { Observable } from 'rxjs';

const TEST_ENZYMES: Enzyme[] = [
  {id: 1, ecNumber:"", name: "Enzyme A", sequence: "Sequence 1", concentration: 1, unit: "mmol/L", brendaLink:""},
  {id: 2, ecNumber:"", name: "Enzyme B", sequence: "Sequence 2", concentration: 2, unit: "mmol/L", brendaLink:""},
  {id: 3, ecNumber:"", name: "Enzyme C", sequence: "Sequence 3", concentration: 3, unit: "mmol/L", brendaLink:""},
  {id: 4, ecNumber:"", name: "Enzyme D", sequence: "Sequence 4", concentration: 4, unit: "mmol/L", brendaLink:""},
  {id: 5, ecNumber:"", name: "Enzyme E", sequence: "Sequence 5", concentration: 5, unit: "mmol/L", brendaLink:""}
];

const TEST_REAGENTS: Reagent[] = [
  {id: 1, name: "Reagent A", concentration: 1, unit: "mmol/L"},
  {id: 2, name: "Reagent B", concentration: 2, unit: "mmol/L"},
  {id: 3, name: "Reagent C", concentration: 3, unit: "mmol/L"},
  {id: 4, name: "Reagent D", concentration: 4, unit: "mmol/L"},
  {id: 5, name: "Reagent E", concentration: 5, unit: "mmol/L"}
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
  enzymeSearchList: EnzymeSearch[];

  constructor(private client: HttpClient) { 
    this.experiment = new Experiment();
    this.user = new User();
    this.experiment.enzymes = TEST_ENZYMES;
    this.experiment.reagents = TEST_REAGENTS;
    this.enzymeSearchList = new Array<EnzymeSearch>();
  }

  public getExperiment(): Experiment {
    return this.experiment;
  }

  public setExperiment(experiment: Experiment): void {
    this.experiment = experiment;
  }

  public getUser(): User {
    return this.user;
  }

  getEnzymeSearchList(enzymeName: string): EnzymeSearch[] {
    enzymeName = enzymeName.trim();
    const options = enzymeName ? { params: new HttpParams().set('enzymeName', enzymeName) } : {};
    this.client.get<EnzymeSearch[]>(this.serverUrl + '/enzyme/search', options).subscribe(
      data => {
        console.log(data);
        this.enzymeSearchList = data;
      },
      error => {
        console.log(error);
      }
    );
    return this.enzymeSearchList;
  }

  getEnzymeSpecification(id: string): Observable<Enzyme> {
    return this.client.get<Enzyme>(this.serverUrl + '/enzyme/' + id);
  }

  createEnzymeML(): Observable<Blob> {
    return this.client.post<Blob>(this.serverUrl + '/enzymeml', this.experiment, httpOptions);
  }

  getExperimentFromZenodo(id: string): Observable<Experiment> {
    return this.client.get<Experiment>(this.serverUrl + '/experiment/' + id);
  }

  updateExperiment(): Observable<Experiment> {
    return this.client.post<Experiment>(this.serverUrl + '/experiment', httpOptions);
  }

  plotMeasurement(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/measurement/plot', this.experiment.measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }

  createPDF(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/measurement/pdf', this.experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }

}
