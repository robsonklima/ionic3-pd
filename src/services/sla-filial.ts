import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SLAFilial } from '../models/sla-filial';

@Injectable()
export class SLAFilialService {
  private slaFiliais: SLAFilial[] = [];

  constructor(
    private http: Http
  ) { }

  buscarSLAFiliais(): Observable<SLAFilial[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAFiliais')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}