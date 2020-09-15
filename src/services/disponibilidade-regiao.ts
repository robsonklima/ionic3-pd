import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { Observable } from "rxjs/Observable";
import { DisponibilidadeRegiao } from '../models/disponibilidade-regiao';
import { Config } from '../models/config';

@Injectable()
export class DisponibilidadeRegiaoService {
  constructor(
    private http: Http
  ) { }

  buscarDisponibilidadeRegioes(): Observable<DisponibilidadeRegiao[]> {
    return this.http.get(Config.API_URL + 'DashboardDisponibilidadeRegiao/')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}