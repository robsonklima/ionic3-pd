import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { PendenciaCliente } from '../models/pendencia-cliente';
import 'rxjs/Rx';


@Injectable()
export class PendenciaClienteService {
  constructor(
    private http: Http
  ) { }

  buscarPendenciaPioresClientes(codFilial: number): Observable<PendenciaCliente[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaPioresClientes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarPendenciaMelhoresClientes(codFilial: number): Observable<PendenciaCliente[]> {
    return this.http.get(Config.API_URL + 'DashboardPendenciaMelhoresClientes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}