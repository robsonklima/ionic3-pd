import { Component} from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'svg-map-page',
  templateUrl: 'svg-map.html'
})
export class SvgMapPage {
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create({
      content: "Carregando Mapa...",
      duration: 1600
    });
    
    loader.present();
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