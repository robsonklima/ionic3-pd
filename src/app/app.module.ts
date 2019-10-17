import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { SLAFilialService } from '../services/sla-filial';
import { ChamadosAntigosService } from '../services/chamados-antigos';
import { PerformanceService } from '../services/performance';
import { ChamadoService } from '../services/chamado';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BarChartPage } from '../pages/test/bar-chart';
import { DoughnutChartPage } from '../pages/test/doughnut-chart';
import { LineChartPage } from '../pages/test/line-chart';
import { ReincidenciaFilialPage } from '../pages/indicadores-filial/reincidencia-filial';
import { SLAFilialPage } from '../pages/indicadores-filial/sla-filial';
import { PendenciaFilialPage } from '../pages/indicadores-filial/pendencia-filial';
import { StatusFiliaisPage } from '../pages/indicadores-filial/status-filiais';
import { IndicadoresFilialMenuPage } from '../pages/indicadores-filial/indicadores-filial-menu';
import { IndicadoresFiliaisPage } from '../pages/indicadores-filial/indicadores-filiais';
import { ChamadosAntigosPage } from '../pages/indicadores-filial/chamados-antigos';
import { ResultadoGeralPage } from '../pages/indicadores-filial/resultado-geral';
import { PerformanceFilialPage } from '../pages/indicadores-filial/performance-filial';
import { IndicadoresClientesPage } from '../pages/indicadores-filial/indicadores-clientes';
import { ChamadoConsultaPage } from '../pages/chamados/chamado-consulta';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    BarChartPage,
    DoughnutChartPage,
    LineChartPage,
    StatusFiliaisPage,
    IndicadoresFilialMenuPage,
    SLAFilialPage,
    PendenciaFilialPage,
    ReincidenciaFilialPage,
    PerformanceFilialPage,
    IndicadoresFiliaisPage,
    ResultadoGeralPage,
    ChamadosAntigosPage,
    IndicadoresClientesPage,
    ChamadoConsultaPage
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
    StatusFiliaisPage,
    IndicadoresFilialMenuPage,
    SLAFilialPage,
    PendenciaFilialPage,
    ReincidenciaFilialPage,
    PerformanceFilialPage,
    IndicadoresFiliaisPage,
    ResultadoGeralPage,
    ChamadosAntigosPage,
    IndicadoresClientesPage,
    ChamadoConsultaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SLAFilialService,
    ChamadosAntigosService,
    PerformanceService,
    ChamadoService
  ]
})
export class AppModule {}
