import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'reincidencia-filial-page',
  templateUrl: 'reincidencia-filial.html'
})
export class ReincidenciaFilialPage {
  nomeFilial: string;
  
  constructor(
    private nav: NavController,
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }
}
