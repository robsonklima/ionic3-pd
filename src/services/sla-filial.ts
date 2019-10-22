import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SLAFilial } from '../models/sla-filial';

@Injectable()
export class SLAFilialService {
  constructor(
    private http: Http
  ) { }

  buscarSLAFilial(codFilial: number): Observable<SLAFilial[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAFiliais/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarSLAFiliais(): Observable<SLAFilial[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAFiliais')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}