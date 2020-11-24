import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiment, IExperiment } from '../model/experiment';
import { environment } from 'src/environments/environment';
import { Deposition, Upload } from '../model/serviceresult';
import { Measurement } from '../model/biocatalysis';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private client: HttpClient) { }

  // Experiment
  getExperimentFromZenodo(id: string): Observable<IExperiment> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.client.get<IExperiment>(environment.backendUrl + '/experiment', options);
  }
  uploadExperimentToZenodo(experiment: IExperiment): Observable<Upload> {
    return this.client.post<Upload>(environment.backendUrl + '/experiment', experiment, httpOptions);
  }
  getExperimentListFromZenodo(): Observable<Array<Deposition>> {
    return this.client.get<Deposition[]>(environment.backendUrl + '/experiment/list');
  }

  // EnzymeML
  createEnzymeML(experiment: IExperiment): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/experiment/export', experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }
  readEnzymeML(enzymeML: File): Observable<Experiment> {
    let formData = new FormData();
    formData.append('enzymeML', enzymeML, enzymeML.name);
    return this.client.post<Experiment>(environment.backendUrl + '/experiment/import', formData, httpOptions);
  }


  // Measurement
  plotMeasurement(measurement: Measurement): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/measurement', measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }
  templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/measurement/template', {responseType: 'blob'});
  }

  // TODO: Service für PDF Dateien

}
