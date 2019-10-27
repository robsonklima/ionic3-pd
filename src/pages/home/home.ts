import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import moment from 'moment';

import { IndicadoresFiliaisPage } from '../indicadores-filial/indicadores-filiais';
import { StatusFiliaisPage } from '../indicadores-filial/status-filiais';
import { ChamadosAntigosPage } from '../indicadores-filial/chamados-antigos';
import { ResultadoGeralPage } from '../indicadores-filial/resultado-geral';
import { IndicadoresClientesPage } from '../indicadores-filial/indicadores-clientes';


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

        <a ion-item (click)="telaResultadoGeral()">
          <ion-icon name="md-clipboard" color="primary" item-start></ion-icon>
          Resultado Geral DSS
          <p>SLA, Reincidência e Pendência (4 meses)</p>
        </a>

        <a ion-item (click)="telaIndicadoresClientes()">
          <ion-icon name="happy" color="primary" item-start></ion-icon>
          Resultado Geral por Cliente
          <p>SLA de {{ nomeMesAtual }}</p>
        </a>

        <a ion-item (click)="telaStatusFiliais()">
          <ion-icon name="md-pie" color="primary" item-start></ion-icon>
          Status Filiais
          <p>Mapa de SLA de nível Brasil</p>
        </a>

        <a ion-item (click)="telaIndicadoresFiliais()"> 
          <ion-icon name="podium" color="primary" item-start></ion-icon>
          Indicadores Filiais
          <p>SLA, Reincidência e Pendência por Filial</p>
        </a>
        
        <a ion-item (click)="telaChamadosAntigos()">
          <ion-icon name="logo-buffer" color="primary" item-start></ion-icon>
          Chamados Antigos
          <p>5 chamados mais antigos com detalhes</p>
        </a>
      </ion-list>
    </ion-content>`
})
export class HomePage {
  nomeMesAtual = moment().locale('pt-BR').format('MMMM');

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

  public telaIndicadoresClientes() {
    this.menu.close().then(() => {
      this.nav.push(IndicadoresClientesPage);  
    })
  }

  public telaChamadosAntigos() {
    this.menu.close().then(() => {
      this.nav.push(ChamadosAntigosPage);  
    })
  }
}
