import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import moment from 'moment';

import { IndicadoresFiliaisPage } from '../indicadores-filial/indicadores-filiais';
import { StatusFiliaisPage } from '../indicadores-filial/status-filiais';
import { ChamadosAntigosPage } from '../indicadores-filial/chamados-antigos';
import { ResultadoGeralPage } from '../indicadores-filial/resultado-geral';
import { SPAFilialPage } from '../indicadores-filial/spa-filial';
import { IndicadoresClientesPage } from '../indicadores-filial/indicadores-clientes';
import { TecnicosDisponibilidadePage } from '../indicadores-tecnico/tecnicos-disponibilidade';
import { MediaGlobalPage } from '../media-global/media-global';
import { RegistroUsoService } from '../../services/registro-uso';
import { DadosGlobaisService } from '../../services/dados-globais';

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
          <ion-icon name="contacts" color="primary" item-start></ion-icon>
          Resultado Geral por Cliente
          <p>SLA de {{ nomeMesAtual }}</p>
        </a>

        <!--<a ion-item (click)="telaStatusFiliais()">
          <ion-icon name="md-pie" color="primary" item-start></ion-icon>
          Status das Filiais
          <p>SLA de {{ nomeMesAtual }}</p>
        </a>-->

        <a ion-item (click)="telaIndicadoresFiliais()"> 
          <ion-icon name="podium" color="primary" item-start></ion-icon>
          Indicadores das Filiais
          <p>SLA, REI e PEN de {{ nomeMesAtual }}</p>
        </a>

        <a ion-item (click)="telaSPAFilial()"> 
          <ion-icon name="podium" color="primary" item-start></ion-icon>
          SPA das Filiais
          <p>SPA</p>
        </a>
        
        <!-- <a ion-item (click)="telaChamadosAntigos()">
          <ion-icon name="logo-buffer" color="primary" item-start></ion-icon>
          Chamados Antigos
          <p>5 chamados mais antigos com detalhes</p>
        </a> -->

        <!-- <a ion-item (click)="telaTecnicosDisponibilidade()">
          <ion-icon name="build" color="primary" item-start></ion-icon>
          Disponibilidade dos Técnicos
          <p>Disponibilidade e média de atendimentos</p>
        </a> -->

        <a ion-item (click)="telaMediaGlobal()">
          <ion-icon name="md-globe" color="primary" item-start></ion-icon>
          Média Global de Atendimento
          <p>Médias de atendimento técnico por dia</p>
        </a>
      </ion-list>
    </ion-content>`
})
export class HomePage {
  nomeMesAtual = moment().locale('pt-BR').format('MMMM');

  constructor(
    public nav: NavController,
    private menu: MenuController,
    private dadosGlobaisService: DadosGlobaisService,
    private registroUsoService: RegistroUsoService
  ) {}

  ionViewWillEnter() {
    this.dadosGlobaisService.buscarDadosGlobaisStorage().then((dados) => {
      if (dados) {
        this.registroUsoService.registrarUso(dados.usuario).subscribe(() => {}, err => {});
      }
    }).catch();
  }

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

  public telaTecnicosDisponibilidade() {
    this.menu.close().then(() => {
      this.nav.push(TecnicosDisponibilidadePage);  
    })
  }

  public telaSPAFilial() {
    this.menu.close().then(() => {
      this.nav.push(SPAFilialPage);  
    })
  }

  public telaMediaGlobal() {
    this.menu.close().then(() => {
      this.nav.push(MediaGlobalPage);  
    })
  }
}
