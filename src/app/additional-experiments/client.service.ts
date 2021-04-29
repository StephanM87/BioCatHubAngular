import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IExperiment } from '../model/experiment';
import { Upload } from '../model/serviceresult';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private client: HttpClient) { }

  // Experiment
  uploadExperimentToZenodo(experiment: IExperiment): Observable<Upload> {
    return this.client.post<Upload>(environment.backendUrl + '/experiment', experiment, httpOptions);
  }

  // EnzymeML
  createEnzymeML(experiment: IExperiment): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/experiment/export', experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }

  //templateFile
  public templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/measurement/template', {responseType: 'blob'});
  }

}