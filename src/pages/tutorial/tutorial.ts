import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Config } from '../../models/config';


@Component({
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  versao: string;
  slides: any;

  constructor(
      private navCtrl: NavController,
      private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.versao = Config.CONSTANTS.VERSAO_APP;
    this.slides = [
      {
        title: "Bem-vindo!",
        description: `Apresentamos as <b>novas funcionalidades</b> do nosso aplicativo! Estamos na versão <b>` + this.versao + '</b>.',
        image: "assets/imgs/ica-slidebox-img-1.png",
      },
      {
        title: "Indicadores",
        description: `Acesse os indicadores do <b>DSS</b> e verifique como estão os atendimentos dos nossos clientes!`,
        image: "assets/imgs/bar-graph.png",
      },
      {
        title: "Performance",
        description: `Acompanhe o desempenho dos nossos <b>técnicos</b> e suas performances!`,
        image: "assets/imgs/car-service.png",
      }
    ];
  }

  public telaLogin() {
    this.navCtrl.push(LoginPage);
  }
}