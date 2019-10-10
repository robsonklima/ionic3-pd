import { Component} from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'performance-filial-home',
  template: `
  <ion-header>
    <ion-navbar no-border-bottom>
      <ion-title>Performance da {{ nomeFilial }}</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>
    
  </ion-content>`
})
export class PerformanceFilialPage {
  nomeFilial: string;

  constructor(
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }
}
