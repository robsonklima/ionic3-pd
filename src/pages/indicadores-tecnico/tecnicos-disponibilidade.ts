import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { Disponibilidade } from '../../models/disponibilidade';
import { TecnicoDisponibilidade } from '../../models/tecnico-disponibilidade';
import { TecnicoDisponibilidadeService } from '../../services/tecnico-disponibilidade';


@Component({
  selector: 'tecnicos-disponibilidade-page',
  templateUrl: 'tecnicos-disponibilidade.html'
})
export class TecnicosDisponibilidadePage {
  disponibilidades: Disponibilidade[] = [];
  tecnicosDisponibilidades: TecnicoDisponibilidade[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private tecnicoDisponibilidade: TecnicoDisponibilidadeService
  ) { }

  ngOnInit() {
   
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
