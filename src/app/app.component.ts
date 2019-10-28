import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DadosGlobaisService } from '../services/dados-globais';
import { UsuarioService } from '../services/usuario';
import { DadosGlobais } from '../models/dados-globais';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  dadosGlobais: DadosGlobais;
  homePage = HomePage;
  loginPage = LoginPage

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private events: Events,
    private menuCtrl: MenuController,
    private dadosGlobaisService: DadosGlobaisService,
    private usuarioService: UsuarioService
  ) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#488aff');
      splashScreen.hide();
      this.events.subscribe('login:efetuado', (dg: DadosGlobais) => { this.dadosGlobais = dg });

      this.dadosGlobaisService.buscarDadosGlobaisStorage().then((dados) => {
        if (dados) 
          this.dadosGlobais = dados;

          if (dados) {
            if (dados.usuario) {
              this.usuarioService.salvarCredenciais(dados.usuario);
              this.menuCtrl.enable(true);
              this.nav.setRoot(this.homePage);
            } else {
              this.nav.setRoot(this.loginPage);
            }
          } else {
            this.nav.setRoot(this.loginPage);
          }
      }).catch();
    });
  }

  public sair() {
    this.dadosGlobaisService.apagarDadosGlobaisStorage().then(() => {
        this.nav.setRoot(this.loginPage);
      }).catch();
  }
}

