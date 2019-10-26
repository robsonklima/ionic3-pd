import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SLACliente } from '../models/sla-cliente';
import 'rxjs/Rx';

@Injectable()
export class SLAClienteService {
  constructor(
    private http: Http
  ) { }

  buscarSLAClientes(codFilial: number): Observable<SLACliente[]> {
    return this.http.get(Config.API_URL + 'DashboardSLAClientes/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}