import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado';


@Component({
  selector: 'chamado-consulta-page',
  templateUrl: 'chamado-consulta.html'
})
export class ChamadoConsultaPage {
  chamado: Chamado;
  codOS: number;
  
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private chamadoService: ChamadoService
  ) {
    this.codOS = this.navParams.get('codOS');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.chamadoService.buscarChamado(this.codOS).subscribe((chamado: Chamado[]) => {
      if (chamado.length > 0)
        this.chamado = chamado[0];

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
