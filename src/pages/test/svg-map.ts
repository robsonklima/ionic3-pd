import { Component} from '@angular/core';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'svg-map-page',
  templateUrl: 'svg-map.html'
})
export class SvgMapPage {
  
  constructor(
    private alertCtrl: AlertController
  ) {}

  public alerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: 'Alerta!',
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}