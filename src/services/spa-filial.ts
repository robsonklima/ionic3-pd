import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { SPAFilial } from '../models/spa-filial';
import 'rxjs/Rx';


@Injectable()
export class SPAFilialService {
  constructor(
    private http: Http
  ) { }

  buscarSPAFilial(): Observable<SPAFilial[]> {
    return this.http.get(Config.API_URL + 'DashboardSPAFilial')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}