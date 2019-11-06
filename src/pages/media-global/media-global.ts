import { Component } from '@angular/core';
import { MediaGlobalService } from '../../services/media-global';
import { MediaGlobal } from '../../models/media-global';
import { MediaGlobalTecnico } from '../../models/media-global-tecnico';


@Component({
  selector: 'page-home',
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
          <ion-item>
            Todas as Intervenções
            <ion-badge item-end>{{ mediaGlobal?.todasIntervencoes }}</ion-badge>
          </ion-item>

          <ion-item>
            Somente Corretivos
            <ion-badge item-end>{{ mediaGlobal?.corretivos }}</ion-badge>
          </ion-item>

          <ion-item>
            Somente Preventivos
            <ion-badge item-end>{{ mediaGlobal?.preventivos }}</ion-badge>
          </ion-item>

          <ion-item>
            Somente Instalação
            <ion-badge item-end>{{ mediaGlobal?.instalacao }}</ion-badge>
          </ion-item>

          <ion-item>
            Somente Alteração de Engenharia
            <ion-badge item-end>{{ mediaGlobal?.alteracaoEngenharia }}</ion-badge>
          </ion-item>
        </ion-list>

        <ion-list *ngSwitchCase="'maiores'">
          <ion-item *ngFor="let mediaMelhoresTecnicos of mediaGlobalMelhoresTecnicos; let i = index">
            <h2>{{ mediaMelhoresTecnicos.nomeUsuario }}</h2>
            <p>{{ mediaMelhoresTecnicos.nomeFilial }}</p>
            <ion-badge item-end>{{ mediaMelhoresTecnicos.todasIntervencoes }}</ion-badge>
          </ion-item>
        </ion-list>

        <ion-list *ngSwitchCase="'menores'">
          <ion-item *ngFor="let mediaPioresTecnicos of mediaGlobalPioresTecnicos; let i = index">
            <h2>{{ mediaPioresTecnicos.nomeUsuario }}</h2>
            <p>{{ mediaPioresTecnicos.nomeFilial }}</p>
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

  constructor(
    private mediaGlobalService: MediaGlobalService
  ) { }

  ngOnInit() {
    this.mediaGlobalService.buscarMediaGlobal().subscribe((media: MediaGlobal) => {
      this.mediaGlobal = media;
    }, e => {});

    this.mediaGlobalService.buscarMediaGlobalMelhoresTecnicos().subscribe((media: MediaGlobalTecnico[]) => {
      this.mediaGlobalMelhoresTecnicos = media;
    }, e => {});

    this.mediaGlobalService.buscarMediaGlobalPioresTecnicos().subscribe((media: MediaGlobalTecnico[]) => {
      this.mediaGlobalPioresTecnicos = media;
    }, e => {});
  }
}
