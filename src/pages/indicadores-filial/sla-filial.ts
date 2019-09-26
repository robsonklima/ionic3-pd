import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'sla-filial-page',
  templateUrl: 'sla-filial.html'
})
export class SLAFilialPage {
  nomeFilial: string;
  
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }
}
