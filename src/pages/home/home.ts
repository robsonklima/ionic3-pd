import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { IndicadoresFiliaisPage } from '../indicadores-filial/indicadores-filiais';
import { StatusFiliaisPage } from '../indicadores-filial/status-filiais';
import { ChamadosAntigosPage } from '../indicadores-filial/chamados-antigos';
import { ResultadoGeralPage } from '../indicadores-filial/resultado-geral';


@Component({
  selector: 'page-home',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <button ion-button icon-only menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        
        <ion-title>Perto Dashboard</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-list-header class="sem-borda">
          Performances das Filiais e Resultado Geral DSS
        </ion-list-header>

        <a ion-item (click)="telaStatusFiliais()">
          Status Filiais
        </a>

        <a ion-item (click)="telaIndicadoresFiliais()"> 
          Indicadores Filiais
        </a>

        <a ion-item (click)="telaResultadoGeral()">
          Resultado Geral DSS
        </a>
        
        <a ion-item (click)="telaChamadosAntigos()">
          Chamados Antigos
        </a>
      </ion-list>
    </ion-content>`
})
export class HomePage {
  
  constructor(
    public nav: NavController,
    private menu: MenuController
  ) {}

  public telaStatusFiliais() {
    this.menu.close().then(() => {
      this.nav.push(StatusFiliaisPage);  
    })
  }

  public telaIndicadoresFiliais() {
    this.menu.close().then(() => {
      this.nav.push(IndicadoresFiliaisPage);  
    })
  }

  public telaResultadoGeral() {
    this.menu.close().then(() => {
      this.nav.push(ResultadoGeralPage);  
    })
  }

  public telaChamadosAntigos() {
    this.menu.close().then(() => {
      this.nav.push(ChamadosAntigosPage);  
    })
  }
}
