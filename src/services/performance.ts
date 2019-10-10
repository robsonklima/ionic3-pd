import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Observable } from "rxjs/Observable";
import { Config } from '../models/config';
import { Performance } from '../models/performance';

@Injectable()
export class PerformanceService {
  performances: Performance[] = [];

  constructor(
    private http: Http
  ) { }

  buscarPerformance(codFilial: number): Observable<Performance[]> {
    return this.http.get(Config.API_URL + 'DashboardPerformance/' + codFilial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}