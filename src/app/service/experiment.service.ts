import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Experiment, IExperiment} from '../model/experiment';
import {environment, environmentEnzymeML} from 'src/environments/environment';
import {Deposition, Upload} from '../model/serviceresult';
import {Measurement} from '../model/measurement';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application'}),
  Omex: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private client: HttpClient) {
  }

  // Experiment
  getExperimentFromZenodo(id: string): Observable<IExperiment> {
    const options = id ? {params: new HttpParams().set('id', id)} : {};
    return this.client.get<IExperiment>(environment.backendUrl + '/experiment', options);
  }

  uploadExperimentToZenodo(experiment: IExperiment): Observable<Upload> {
    return this.client.post<Upload>(environment.backendUrl + '/experiment', experiment, httpOptions);
  }

  getExperimentListFromZenodo(): Observable<Array<Deposition>> {
    return this.client.get<Deposition[]>(environment.backendUrl + '/experiment/list');
  }

  // EnzymeML TODO can this be deleted?
  /*createEnzymeML(experiment: IExperiment): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/experiment/export', experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }*/

  createEnzymeML(experiment: IExperiment): Observable<any> {
    return this.client.post(environmentEnzymeML.backendUrl + '/createEnzymeML', experiment, {
      headers: httpOptions.Omex,
      responseType: 'blob'
    });
  }

  readEnzymeML(enzymeML: any): Observable<any> {
    const data = {name: 'Jürgen', alter: '32'};
    const formData = new FormData();
    console.log(enzymeML); // TODO no such logs in prod versions
    formData.append('enzymeML', enzymeML, enzymeML.name);
    formData.append('hallo', JSON.stringify(data));
    console.log(formData); // TODO no such logs in prod versions
    return this.client.post<Experiment>(environmentEnzymeML.backendUrl + '/readEnzymeML', formData, {headers: httpOptions.Omex});
  }


  // Measurement
  plotMeasurement(measurement: Measurement): Observable<Blob> {
    console.log(measurement); // TODO no such logs in prod versions
    return this.client.post(environment.backendUrl + '/measurement', measurement, {
      headers: httpOptions.headers,
      responseType: 'blob'
    });
  }

  templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/measurement/template', {responseType: 'blob'});
  }

  // TODO: Service für PDF Dateien

}
