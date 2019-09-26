import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarChartPage } from '../pages/test/bar-chart';
import { DoughnutChartPage } from '../pages/test/doughnut-chart';
import { LineChartPage } from '../pages/test/line-chart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BarChartPage,
    DoughnutChartPage,
    LineChartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BarChartPage,
    DoughnutChartPage,
    LineChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
