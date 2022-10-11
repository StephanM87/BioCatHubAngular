import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiment, IExperiment } from '../model/experiment';
import { environment, environmentEnzymeML } from 'src/environments/environment';
import { Deposition, Upload } from '../model/serviceresult';
import { Measurement } from '../model/biocatalysis';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application' }),
  Omex: new HttpHeaders(),
  headers_json: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private client: HttpClient) { }

  // Experiment
  getExperimentFromZenodo(id: string, key:String): Observable<IExperiment> {
    if (key == null){
      const options = id ? { params: new HttpParams().set('id', id) } : {};
      return this.client.get<IExperiment>(environmentEnzymeML.backendUrl + '/zenodo/getexperiment', options);
  }
    else if(key != null){
      let data = {id:id, access_token:key}
      return this.client.post<IExperiment>(environmentEnzymeML.backendUrl + '/zenodo/getexperiment',JSON.stringify(data), {headers:httpOptions.headers_json});

    }


}
  uploadExperimentToZenodo(experiment: IExperiment): Observable<Upload> {
    //console.log(experiment)
    let data = {experiment:experiment, access_token:null}
    return this.client.post<Upload>(environmentEnzymeML.backendUrl + '/zenodo/publishexperiment', data, httpOptions);
  }
  getExperimentListFromZenodo(): Observable<Array<Deposition>> {
    return this.client.get<Deposition[]>(environmentEnzymeML.backendUrl + '/zenodo');
  }

  getProjectListFromZenodo(key): Observable<Array<Deposition>> {
    let project_token = {access_token:key}

    return this.client.post<Deposition[]>(environmentEnzymeML.backendUrl + '/zenodo', JSON.stringify(project_token), {headers:httpOptions.headers_json});
  }


  // EnzymeML
  /*createEnzymeML(experiment: IExperiment): Observable<Blob> {
    return this.client.post(environment.backendUrl + '/experiment/export', experiment, {headers: httpOptions.headers, responseType: 'blob'});
  }*/

  createEnzymeML(experiment: IExperiment): Observable<any> {
    return this.client.post(environmentEnzymeML.backendUrl + '/create_enzymeml', experiment, {headers: httpOptions.Omex, responseType: 'blob'});
  }
  readEnzymeML(enzymeML: any): Observable<any> {
    let data = {"name": "Jürgen", "alter": "32"}
    let formData = new FormData();
    console.log(enzymeML);
    formData.append('enzymeML', enzymeML, enzymeML.name);
    formData.append("hallo", JSON.stringify(data));
    console.log(formData);
    return this.client.post<Experiment>(environmentEnzymeML.backendUrl + '/read_enzymeml', formData, {headers: httpOptions.Omex});
  }

  retrobiocatDBCall(query){
    return this.client.post(environment.retrobiohub + '/minimongo/', query)
  }


  // Measurement
  plotMeasurement(measurement: Measurement): Observable<Blob> {
    console.log(measurement);
    return this.client.post(environment.backendUrl + '/measurement', measurement, {headers: httpOptions.headers, responseType: 'blob'});
  }
  templateFile(): Observable<Blob> {
    return this.client.get(environment.backendUrl + '/measurement/template', {responseType: 'blob'});
  }



  // TODO: Service für PDF Dateien

}
