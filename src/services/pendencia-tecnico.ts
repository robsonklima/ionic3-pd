import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { PendenciaTecnico } from '../models/pendencia-tecnico';
import 'rxjs/Rx';


@Injectable()
export class PendenciaTecnicoService {
  constructor(
    private http: Http
  ) { }

  buscarPendenciaPioresTecnicos(codFilial: number): Observable<PendenciaTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaPioresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarPendenciaMelhoresTecnicos(codFilial: number): Observable<PendenciaTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaMelhoresTecnicos/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}