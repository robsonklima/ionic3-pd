import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SLAFilial } from '../../models/sla-filial';

import { SLAFilialPage } from './sla-filial';
import { PendenciaFilialPage } from './pendencia-filial';
import { ReincidenciaFilialPage } from './reincidencia-filial';


@Component({
  selector: 'indicadores-filial-menu-page',
  templateUrl: 'indicadores-filial-menu.html'
})
export class IndicadoresFilialMenuPage {
  slaFilial: SLAFilial;
  
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  public telaSLAFilial() {
    this.navCtrl.push(SLAFilialPage, { nomeFilial: this.slaFilial.nomeFilial });
  }

  public telaPendenciaFilial() {
    this.navCtrl.push(PendenciaFilialPage, { nomeFilial: this.slaFilial.nomeFilial });
  }

  public telaReincidenciaFilial() {
    this.navCtrl.push(ReincidenciaFilialPage, { nomeFilial: this.slaFilial.nomeFilial });
  }
}
