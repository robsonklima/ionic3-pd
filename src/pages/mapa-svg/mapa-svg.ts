import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { SLAFilialService } from '../../services/sla-filial';
import { SLAFilial } from '../../models/sla-filial';
import { IndicadoresFilialPage } from '../indicadores-filial/indicadores-filial';


@Component({
  selector: 'mapa-svg-page',
  templateUrl: 'mapa-svg.html'
})
export class MapaSvgPage {
  slaFiliais: SLAFilial[] = [];
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private slaFilialService: SLAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: "Carregando Mapa..."
    });
    
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
        this.slaFiliais = dados;

        loader.dismiss();
      },
      err => {
        loader.dismiss()
      });
  }

  public carregarCor(nomeFilial: string): string {
    let slas: SLAFilial[] = this.slaFiliais.filter((s) => { return (s.nomeFilial == nomeFilial) });

    if (slas.length == 0) {
      return 'black';
    }
    
    if (slas[0].percentual < 92) {
      return 'red';
    } else if (slas[0].percentual >= 92 && slas[0].percentual < 95) {
      return 'orange';
    } else if (slas[0].percentual >= 95) {
      return 'green';
    }
  }

  public telaIndicadoresFilial(nomeFilial: string) {
    this.navCtrl.push(IndicadoresFilialPage, { nomeFilial: nomeFilial });
  }

  public alerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: null,
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}