import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'pendencia-filial-page',
  templateUrl: 'pendencia-filial.html'
})
export class PendenciaFilialPage {
  nomeFilial: string;
  
  constructor(
    private nav: NavController,
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }
}
