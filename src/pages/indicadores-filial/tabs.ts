import { Component } from '@angular/core';
import { StatusFiliaisPage } from './status-filiais';
import { IndicadoresFiliaisPage } from './indicadores-filiais';

  
@Component({
  template: `
    <ion-header no-border>
      <ion-navbar no-border-bottom>
        <ion-title>Indicadores das Filiais</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-tabs>
      <ion-tab tabIcon="map" tabTitle="Status" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="list" tabTitle="Detalhes" [root]="tab2"></ion-tab>
      <ion-tab tabIcon="star" tabTitle="Outro" [root]="tab1"></ion-tab>
    </ion-tabs>`
})
export class TabsPage {
  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = StatusFiliaisPage;
    this.tab2 = IndicadoresFiliaisPage;
  }
}