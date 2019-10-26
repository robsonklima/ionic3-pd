import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage } from "@ionic/storage";
import 'rxjs/Rx';

import { DadosGlobais } from '../models/dados-globais';

@Injectable()
export class DadosGlobaisService {
  dadosGlobais: DadosGlobais;

  constructor(
    private http: Http,
    private storage: Storage
  ) { }

  insereDadosGlobaisStorage(dadosGlobais: DadosGlobais): Promise<DadosGlobais> {
    return new Promise((resolve, reject) => {
      this.dadosGlobais = dadosGlobais;

      this.storage.set('DadosGlobais', this.dadosGlobais).then(() => {
        resolve(this.dadosGlobais);
      }).catch();
    });
  }

  buscarDadosGlobaisStorage(): Promise<DadosGlobais> {
    return new Promise((resolve, reject) => {
      this.storage.get('DadosGlobais')
      .then((dg: DadosGlobais) => {
        this.dadosGlobais = dg != null ? dg : null;
        resolve(this.dadosGlobais);
      }).catch(err => reject());
    });
  }

  apagarDadosGlobaisStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set('DadosGlobais', null)
        .then((res) => {
          resolve(res);
        })
        .catch();
    });
  }
}