import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

import { Config } from '../../models/config';
import { TecnicoDisponibilidade } from '../../models/tecnico-disponibilidade';
import { Disponibilidade } from '../../models/disponibilidade';
import { MediaGlobalService } from '../../services/media-global';
import { TecnicoDisponibilidadeService } from '../../services/tecnico-disponibilidade';
import { MediaGlobal } from '../../models/media-global';
import { MediaGlobalTecnico } from '../../models/media-global-tecnico';


@Component({
  selector: 'media-global-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Média Global</ion-title>
      </ion-navbar>

      <ion-toolbar no-border-top>
        <ion-segment [(ngModel)]="modo">
          <ion-segment-button value="media">
            Média
          </ion-segment-button>
          <ion-segment-button value="maiores">
            Maiores
          </ion-segment-button>
          <ion-segment-button value="menores">
            Menores
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div [ngSwitch]="modo">
        <ion-list *ngSwitchCase="'media'">
          <ion-list-header class="sem-borda">
            Média Global de Atendimentos de Todas as Filiais
          </ion-list-header>

          <ion-item>
            Todos os Atendimentos
            <p>Média de Atend. por Técnico e Dia Útil</p>
            <ion-badge item-end>{{ mediaGlobal?.todasIntervencoes }}</ion-badge>
          </ion-item>

          <ion-item>
            Técnicos c/ Chamados Corretivos
            <ion-badge item-end>{{ qtdTecnicosComChamadosTransferidos }}</ion-badge>
          </ion-item>

          <ion-item>
            Técnicos c/ Chamados Não Corretivos
            <ion-badge item-end>{{ qtdTecnicosSemChamadosTransferidos }}</ion-badge>
          </ion-item>

          <ion-item>
            <b>Total</b>
            <ion-badge item-end>{{ qtdTecnicosSemChamadosTransferidos + qtdTecnicosComChamadosTransferidos }}</ion-badge>
          </ion-item>
        </ion-list>

        <ion-list *ngSwitchCase="'maiores'">
          <ion-list-header class="sem-borda">
            Média de Atendimentos por Dia
          </ion-list-header>

          <ion-item *ngFor="let mediaMelhoresTecnicos of mediaGlobalMelhoresTecnicos; let i = index">
            <h3>{{ mediaMelhoresTecnicos.nomeFilial }} - {{ mediaMelhoresTecnicos.nomeUsuario }}</h3>
            <ion-badge item-end>{{ mediaMelhoresTecnicos.todasIntervencoes }}</ion-badge>
          </ion-item>
        </ion-list>

        <ion-list *ngSwitchCase="'menores'">
          <ion-list-header class="sem-borda">
            Média de Atendimentos por Dia
          </ion-list-header>

          <ion-item *ngFor="let mediaPioresTecnicos of mediaGlobalPioresTecnicos; let i = index">
            <h3>{{ mediaPioresTecnicos.nomeFilial }} - {{ mediaPioresTecnicos.nomeUsuario }}</h3>
            <ion-badge item-end>{{ mediaPioresTecnicos.todasIntervencoes }}</ion-badge>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>`
})
export class MediaGlobalPage {
  modo: string = 'media';
  mediaGlobal: MediaGlobal;
  mediaGlobalMelhoresTecnicos: MediaGlobalTecnico[] = [];
  mediaGlobalPioresTecnicos: MediaGlobalTecnico[] = [];
  disponibilidades: Disponibilidade[] = [];
  pioresDisponibilidades: Disponibilidade[] = [];
  melhoresDisponibilidades: Disponibilidade[] = [];
  tecnicosDisponibilidades: TecnicoDisponibilidade[] = [];
  tecnicosInativos:number = 0;
  qtdTecnicosComChamadosTransferidos:number = 0;
  qtdTecnicosSemChamadosTransferidos:number = 0;
  qtdTecnicos:number = 0;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private mediaGlobalService: MediaGlobalService,
    private tecnicoDisponibilidadeService: TecnicoDisponibilidadeService
  ) { }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.mediaGlobalService.buscarMediaGlobal().subscribe((media: MediaGlobal) => {
      this.mediaGlobal = media;

      this.tecnicoDisponibilidadeService.buscarTecnicoDisponibilidade().subscribe((dados: TecnicoDisponibilidade[]) => {
        this.tecnicosDisponibilidades = dados;
  
        let dFiliais: TecnicoDisponibilidade[] = this.tecnicosDisponibilidades.filter((filial, index, self) =>
          index === self.findIndex((aux) => (aux.nomeFilial === filial.nomeFilial && aux.nomeFilial === filial.nomeFilial))
        );
  
        let filiais = dFiliais.map((i) => { return i['nomeFilial'] }).sort();

        filiais.forEach((d) => {
          let disp = new Disponibilidade();
          disp.nomeFilial = d;
          disp.qtdTecnicosComChamadosTransferidos = this.buscarQtdTecnicosAtivosComChamadosTransferidosCorretivos(d);
          disp.qtdTecnicosSemChamadosTransferidos = this.buscarQtdTecnicosSemChamadosTransferidosNaoCorretivos(d);
          disp.qtdTecnicosInativos = this.buscarQtdTecnicosInativos(d);
          disp.qtdTecnicos = this.buscarQtdTecnicos(d);
          this.disponibilidades.push(disp);

          this.tecnicosInativos += disp.qtdTecnicosInativos;
          this.qtdTecnicosComChamadosTransferidos += disp.qtdTecnicosComChamadosTransferidos;
          this.qtdTecnicosSemChamadosTransferidos += disp.qtdTecnicosSemChamadosTransferidos;
          this.qtdTecnicos += disp.qtdTecnicos;  
        });

        this.melhoresDisponibilidades = this.disponibilidades.sort((a, b) => 
          (a.qtdTecnicosSemChamadosTransferidos > b.qtdTecnicosSemChamadosTransferidos) ? 1 : 
          ((b.qtdTecnicosSemChamadosTransferidos > a.qtdTecnicosSemChamadosTransferidos) ? -1 : 0)
        ).slice(0, 5);

        this.pioresDisponibilidades = this.disponibilidades.sort((a, b) => 
          (a.qtdTecnicosSemChamadosTransferidos < b.qtdTecnicosSemChamadosTransferidos) ? 1 : 
          ((b.qtdTecnicosSemChamadosTransferidos < a.qtdTecnicosSemChamadosTransferidos) ? -1 : 0)
        ).slice(0, 5);

        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) });
      });
    }, () => { loader.dismiss() });

    this.mediaGlobalService.buscarMediaGlobalMelhoresTecnicos().subscribe((media: MediaGlobalTecnico[]) => {
      this.mediaGlobalMelhoresTecnicos = media;
    }, e => {});

    this.mediaGlobalService.buscarMediaGlobalPioresTecnicos().subscribe((media: MediaGlobalTecnico[]) => {
      this.mediaGlobalPioresTecnicos = media;
    }, e => {});
  }

  private buscarQtdTecnicosAtivosComChamadosTransferidosCorretivos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && d.qtdChamadosTransferidos > 0 && (!d.indFerias && d.indTecnicoAtivo) && d.qtdChamadosAtendidosSomenteCorretivos > 0) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicosSemChamadosTransferidosNaoCorretivos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && !d.qtdChamadosTransferidos && (!d.indFerias && d.indTecnicoAtivo) 
          && (d.qtdChamadosAtendidosTodasIntervencoes > 0 || d.qtdChamadosAtendidosSomenteCorretivos > 0)) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicosInativos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && (d.indFerias || !d.indTecnicoAtivo)) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial) {
        s++;
      }
    });

    return s;
  }

  private exibirAlerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: null,
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}
