import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Enzyme, Reagent } from '../model/biocatalysis';
import { EnzymeSearch, EnzymeSpecification, ReactionSearch, ReactionSpecification, Deposition, Upload } from '../model/serviceresult';
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

  // Enzymes
  getEnzymeSearchList(enzymeName: string): Observable<Array<EnzymeSearch>> {
    enzymeName = enzymeName.trim();
    const options = enzymeName ? { params: new HttpParams().set('enzymeName', enzymeName) } : {};
    return this.client.get<EnzymeSearch[]>(this.serverUrl + '/enzyme/list', options);
  }
  getEnzymeSpecification(id: string): Observable<EnzymeSpecification> {
    const options = id ? { params: new HttpParams().set('enzyme', id) } : {};
    return this.client.get<EnzymeSpecification>(this.serverUrl + '/enzyme', options);
  }

  // Reactions
  getReactionSearchList(ecNumber: string) : Observable<Array<ReactionSearch>> {
    const options = ecNumber ? { params: new HttpParams().set('ecNumber', ecNumber) } : {};
    return this.client.get<ReactionSearch[]>(this.serverUrl + '/reaction/list', options);
  }
  getReactionSpecification(reactionId: string) : Observable<ReactionSpecification> {
    const options = reactionId ? { params: new HttpParams().set('reactionId', reactionId) } : {};
    return this.client.get<ReactionSpecification>(this.serverUrl + '/reaction', options);
  }

  // EnzymeML
  createEnzymeML(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/enzymeml', this.experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }
  // TODO: Service für Import von EnzymeML Dateien

  // Zenodo
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

  // Measurement
  plotMeasurement(): Observable<Blob> {
    return this.client.post(this.serverUrl + '/measurement', this.experiment.measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }

  // TODO: Service für Templates (Experimente und Messwerte)

  // TODO: Service für PDF Dateien

}
