import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../models/config';
import { Observable } from "rxjs/Observable";
import { Usuario } from '../models/usuario';

@Injectable()
export class RegistroUsoService {
  private usuario: Usuario;

  constructor(
    private http: Http
  ) { }

  public registrarUso(usuario: Usuario): Observable<Usuario> {
    return this.http.post(Config.API_URL + 'RegistroUso', usuario)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}