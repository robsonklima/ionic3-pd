import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { PendenciaRegiao } from '../models/pendencia-regiao';
import 'rxjs/Rx';


@Injectable()
export class PendenciaRegiaoService {
  constructor(
    private http: Http
  ) { }

  buscarPendenciaPioresRegioes(codFilial: number): Observable<PendenciaRegiao[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaPioresRegioes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarPendenciaMelhoresRegioes(codFilial: number): Observable<PendenciaRegiao[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaMelhoresRegioes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}