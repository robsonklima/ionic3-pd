import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../models/config';
import { Observable } from "rxjs/Observable";
import { Usuario } from '../models/usuario';
import { Login } from '../models/login';

@Injectable()
export class UsuarioService {
  private usuario: Usuario;

  constructor(
    private http: Http
  ) { }

  public obterUsuario(): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      resolve(this.usuario)
    });
  }

  public salvarCredenciais(usuario: Usuario) {
    this.usuario = usuario;
  }

  public login(login: Login): Observable<Login> {
    return this.http.post(Config.API_URL + 'UsuarioLogin', login)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}