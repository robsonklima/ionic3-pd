import { Component} from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLAFilialService } from '../../services/sla-filial';


@Component({
  selector: 'indicadores-filiais-page',
  templateUrl: 'indicadores-filiais.html'
})
export class IndicadoresFiliaisPage {
  modo: string = "sla";
  sla: SLAFilial[] = [];
  pendencia: SLAFilial[] = [];
  reincidencia: SLAFilial[] = [];
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private slaFilialService: SLAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      this.sla = dados.sort(function(a, b) { 
        return ((a.percentual > b.percentual) ? -1 : ((a.percentual < b.percentual) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.pendencia = dados.sort(function(a, b) { 
        return ((a.pendencia < b.pendencia) ? -1 : ((a.pendencia > b.pendencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.reincidencia = dados.sort(function(a, b) { 
        return ((a.reincidencia < b.reincidencia) ? -1 : ((a.reincidencia > b.reincidencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      // this.slaFiliais.forEach(e => {
      //   if(e.nomeFilial == 'TOTAL') {
      //     let p = this.slaFiliais.reduce(function(prev, cur) { 
      //       return prev + (cur.pendencia) 
      //     }, 0) / this.slaFiliais.length - 1;

      //     e.pendencia = Number(p.toFixed(2));
      
      //     let r = this.slaFiliais.reduce(function(prev, cur) { 
      //       return prev + (cur.reincidencia) 
      //     }, 0) / this.slaFiliais.length - 1;
          
      //     e.reincidencia = Number(r.toFixed(2));
      //   }
      // });

      loader.dismiss();
    },
    err => {
      loader.dismiss()

      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
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
