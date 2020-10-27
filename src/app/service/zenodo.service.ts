import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposition, Upload } from '../model/serviceresult';
import { IExperiment} from '../model/experiment';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ZenodoService {

  constructor(private client: HttpClient) { }

  getExperimentFromZenodo(id: string): Observable<IExperiment> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.client.get<IExperiment>(environment.backendUrl + '/experiment', options);
  }

  getExperimentListFromZenodo(): Observable<Array<Deposition>> {
    return this.client.get<Deposition[]>(environment.backendUrl + '/experiment/list');
  }

  uploadExperiment(experiment: IExperiment): Observable<Upload> {
    return this.client.post<Upload>(environment.backendUrl + '/experiment', experiment, httpOptions);
  }

}
