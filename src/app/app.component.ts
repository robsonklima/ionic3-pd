import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BarChartPage } from '../pages/test/bar-chart';
import { DoughnutChartPage } from '../pages/test/doughnut-chart';
import { LineChartPage } from '../pages/test/line-chart';
import { SvgMapPage } from '../pages/test/svg-map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  homePage = HomePage;
  loginPage = LoginPage

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.enable(true);
      this.nav.setRoot(this.homePage);
    });
  }

  public telaBarChart() {
    this.menuCtrl.close().then(() => {
      this.nav.push(BarChartPage);  
    })
  }

  public telaDoughnutChart() {
    this.menuCtrl.close().then(() => {
      this.nav.push(DoughnutChartPage);  
    })
  }

  public telaLineChart() {
    this.menuCtrl.close().then(() => {
      this.nav.push(LineChartPage);  
    })
  }

  public telaSvgMap() {
    this.menuCtrl.close().then(() => {
      this.nav.push(SvgMapPage);  
    })
  }

  public sair() {
    this.nav.setRoot(this.loginPage);
  }
}

