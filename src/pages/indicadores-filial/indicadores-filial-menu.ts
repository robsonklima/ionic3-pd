import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SLAFilial } from '../../models/sla-filial';

import { SLAFilialPage } from './sla-filial';
import { PendenciaFilialPage } from './pendencia-filial';
import { ReincidenciaFilialPage } from './reincidencia-filial';
import { PerformanceFilialPage } from './performance-filial';


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

  public telaPerformanceFilial() {
    this.navCtrl.push(PerformanceFilialPage, { slaFilial: this.slaFilial });
  }

  public telaSLAFilial() {
    this.navCtrl.push(SLAFilialPage, { slaFilial: this.slaFilial });
  }

  public telaPendenciaFilial() {
    this.navCtrl.push(PendenciaFilialPage, { slaFilial: this.slaFilial });
  }

  public telaReincidenciaFilial() {
    this.navCtrl.push(ReincidenciaFilialPage, { slaFilial: this.slaFilial });
  }
}
