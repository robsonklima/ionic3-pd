import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { ReincidenciaTecnico } from '../models/reincidencia-tecnico';
import 'rxjs/Rx';


@Injectable()
export class ReincidenciaTecnicoService {
  constructor(
    private http: Http
  ) { }

  buscarReincidenciaPioresTecnicos(codFilial: number): Observable<ReincidenciaTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardReincidenciaPioresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarReincidenciaMelhoresTecnicos(codFilial: number): Observable<ReincidenciaTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardReincidenciaMelhoresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}