import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { TecnicoDisponibilidade } from '../models/tecnico-disponibilidade';
import 'rxjs/Rx';


@Injectable()
export class TecnicoDisponibilidadeService {
  constructor(
    private http: Http
  ) { }

  buscarTecnicoDisponibilidade(): Observable<TecnicoDisponibilidade[]> {
    return this.http.get(Config.API_URL + 'DashboardTecnicoDisponibilidade/')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}