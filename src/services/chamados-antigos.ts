import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { ChamadoAntigo } from '../models/chamado-antigo';

@Injectable()
export class ChamadosAntigosService {
  constructor(
    private http: Http
  ) { }

  buscarChamadosAntigos(): Observable<ChamadoAntigo[]> {
    return this.http.get(Config.API_URL + 'DashboardChamadosAntigos')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}