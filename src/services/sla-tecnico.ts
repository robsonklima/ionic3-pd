import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SLATecnico } from '../models/sla-tecnico';
import 'rxjs/Rx';

@Injectable()
export class SLATecnicoService {
  constructor(
    private http: Http
  ) { }

  buscarSLAPioresTecnicos(codFilial: number): Observable<SLATecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAPioresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarSLAMelhoresTecnicos(codFilial: number): Observable<SLATecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAMelhoresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}