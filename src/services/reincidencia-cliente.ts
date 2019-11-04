import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { ReincidenciaCliente } from '../models/reincidencia-cliente';
import 'rxjs/Rx';


@Injectable()
export class ReincidenciaClienteService {
  constructor(
    private http: Http
  ) { }

  buscarReincidenciaPioresClientes(codFilial: number): Observable<ReincidenciaCliente[]> {
    return this.http.get(Config.API_URL + 'DashboardReincidenciaPioresClientes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarReincidenciaMelhoresClientes(codFilial: number): Observable<ReincidenciaCliente[]> {
    return this.http.get(Config.API_URL + 'DashboardReincidenciaMelhoresClientes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}