import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BarChartPage } from '../pages/test/bar-chart';
import { DoughnutChartPage } from '../pages/test/doughnut-chart';
import { LineChartPage } from '../pages/test/line-chart';
import { MapaSvgPage } from '../pages/mapa-svg/mapa-svg';

import { SLAFilialService } from '../services/sla-filial';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    BarChartPage,
    DoughnutChartPage,
    LineChartPage,
    MapaSvgPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    BarChartPage,
    DoughnutChartPage,
    LineChartPage,
    MapaSvgPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SLAFilialService
  ]
})
export class AppModule {}
