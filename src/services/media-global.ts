import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { MediaGlobal } from '../models/media-global';
import { MediaGlobalTecnico } from '../models/media-global-tecnico';

@Injectable()
export class MediaGlobalService {
  constructor( private http: Http ) { }

  buscarMediaGlobal(): Observable<MediaGlobal> {
    return this.http.get(Config.API_URL + 'DashboardMediaGlobal')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarMediaGlobalMelhoresTecnicos(): Observable<MediaGlobalTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardMediaGlobalTodasIntMelhoresTecnicos')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  buscarMediaGlobalPioresTecnicos(): Observable<MediaGlobalTecnico[]> {
    return this.http.get(Config.API_URL + 'DashboardMediaGlobalTodasIntPioresTecnicos')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}