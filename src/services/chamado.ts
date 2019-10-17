import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { Chamado } from '../models/chamado';

@Injectable()
export class ChamadoService {
  chamado: Chamado[] = [];

  constructor( private http: Http ) { }

  buscarChamado(codOS: number): Observable<Chamado[]> {
    return this.http.get(Config.API_URL + 'Os/' + codOS)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}