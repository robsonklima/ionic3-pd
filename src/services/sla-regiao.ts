import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SLARegiao } from '../models/sla-regiao';

@Injectable()
export class SLARegiaoService {
  constructor(
    private http: Http
  ) { }

  buscarSLARegioes(codFilial: number): Observable<SLARegiao[]> {
    return this.http.get(Config.API_URL + 'DashboardSLARegioes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}