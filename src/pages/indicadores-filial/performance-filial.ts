import { Component} from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'performance-filial-home',
  templateUrl: 'performance-filial.html'
})
export class PerformanceFilialPage {
  nomeFilial: string;

  constructor(
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }
}
