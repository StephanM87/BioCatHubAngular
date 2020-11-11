import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperiment} from '../model/experiment';
import { Measurement } from '../model/biocatalysis';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private client: HttpClient) { }

  // EnzymeML
  createEnzymeML(experiment: IExperiment): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/enzymeml', experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }
  // TODO: Service für Import von EnzymeML Dateien


  // Measurement
  plotMeasurement(measurement: Measurement): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/measurement', measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }

  templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/document/template', {responseType: 'blob'});
  }

  // TODO: Service für PDF Dateien

}
