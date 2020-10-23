import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Enzyme, Reagent } from '../model/biocatalysis';
import { EnzymeSearch, ReagentSearch, EnzymeSpecification, ReagentSpecification, Deposition, Upload, ReactionSearch, ReactionSpecification } from '../model/serviceresult';
import { Experiment, IExperiment} from '../model/experiment';
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
  id: string;
  zenodoLink: string;
  date: Date;
  files: File[];

  constructor(private client: HttpClient) { 
    this.experiment = new Experiment();
    this.date = new Date();
    this.experiment.enzymes = new Array<Enzyme>();
    this.experiment.reagents = new Array<Reagent>();
  }

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

  getReactionSearchList(ecNumber: string) : Observable<Array<ReactionSearch>> {
    const options = ecNumber ? { params: new HttpParams().set('ecNumber', ecNumber) } : {};
    return this.client.get<ReactionSearch[]>(this.serverUrl + '/enzyme/reactions', options);
  }

  getReactionSpecification(reactionId: string) : Observable<Array<ReactionSpecification>> {
    const options = reactionId ? { params: new HttpParams().set('reactionId', reactionId) } : {};
    return this.client.get<ReactionSpecification[]>(this.serverUrl + '/enzyme/reaction', options);
  }

  createEnzymeML(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/enzymeml', this.experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }

  getExperimentFromZenodo(id: string): Observable<IExperiment> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.client.get<IExperiment>(this.serverUrl + '/experiment', options);
  }

  getExperimentListFromZenodo(): Observable<Array<Deposition>> {
    return this.client.get<Deposition[]>(this.serverUrl + '/experiment/list');
  }

  uploadExperiment(): Observable<Upload> {
    return this.client.post<Upload>(this.serverUrl + '/experiment', this.experiment, httpOptions);
  }

  plotMeasurement(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/measurement/plot', this.experiment.measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }

  createPDF(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/measurement/pdf', this.experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }

}
