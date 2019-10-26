import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { ReincidenciaRegiao } from '../models/reincidencia-regiao';
import 'rxjs/Rx';

@Injectable()
export class ReincidenciaRegiaoService {
  constructor(
    private http: Http
  ) { }

  buscarReincidenciaRegioes(codFilial: number): Observable<ReincidenciaRegiao[]> {
    return this.http.get(Config.API_URL + 'DashboardReincidenciaRegioes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}