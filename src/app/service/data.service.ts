import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Enzyme, Reagent, Replicate, Vessel, Reaction } from '../model/biocatalysis';
import { EnzymeSearch, ReagentSearch, EnzymeSpecification, ReagentSpecification } from '../model/serviceresult';
import { Experiment} from '../model/experiment';
import { User } from '../model/user';
import { Observable } from 'rxjs';

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
  files: File[];

  constructor(private client: HttpClient) { 
    this.experiment = new Experiment();
    this.experiment.enzymes = new Array<Enzyme>();
    this.experiment.reagents = new Array<Reagent>();
    this.user = new User();
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

  public getFiles(): File[] {
    return this.files;
  }

  getEnzymeSearchList(enzymeName: string): Observable<Array<EnzymeSearch>> {
    enzymeName = enzymeName.trim();
    const options = enzymeName ? { params: new HttpParams().set('enzymeName', enzymeName) } : {};
    return this.client.get<EnzymeSearch[]>(this.serverUrl + '/enzyme/search', options);
  }

  getReagentSearchList(reagentName: string): Observable<Array<ReagentSearch>> {
    reagentName = reagentName.trim();
    const options = reagentName ? { params: new HttpParams().set('reagentName', reagentName) } : {};
    return this.client.get<ReagentSearch[]>(this.serverUrl + '/enzyme/search', options);
  }

  getEnzymeSpecification(id: string): Observable<EnzymeSpecification> {
    const options = id ? { params: new HttpParams().set('enzyme', id) } : {};
    return this.client.get<EnzymeSpecification>(this.serverUrl + '/enzyme', options);
  }

  getReagentSpecification(id: string): Observable<ReagentSpecification> {
    const options = id ? { params: new HttpParams().set('reagent', id) } : {};
    return this.client.get<ReagentSpecification>(this.serverUrl + '/enzyme', options);
  }

  createEnzymeML(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/enzymeml', this.experiment, {headers: httpOptions.headers, responseType: 'blob'});
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
