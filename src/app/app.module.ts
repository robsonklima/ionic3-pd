import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { SLAFilialService } from '../services/sla-filial';
import { ChamadosAntigosService } from '../services/chamados-antigos';
import { PerformanceService } from '../services/performance';
import { ChamadoService } from '../services/chamado';
import { SLATecnicoService } from '../services/sla-tecnico';
import { SLAClienteService } from '../services/sla-cliente';
import { UsuarioService } from '../services/usuario';
import { SLARegiaoService } from '../services/sla-regiao';
import { PendenciaClienteService } from '../services/pendencia-cliente';
import { PendenciaTecnicoService } from '../services/pendencia-tecnico';
import { PendenciaRegiaoService } from '../services/pendencia-regiao';
import { ReincidenciaRegiaoService } from '../services/reincidencia-regiao';
import { ReincidenciaTecnicoService } from '../services/reincidencia-tecnico';
import { ReincidenciaClienteService } from '../services/reincidencia-cliente';
import { DadosGlobaisService } from '../services/dados-globais';
import { TecnicoDisponibilidadeService } from '../services/tecnico-disponibilidade';
import { MediaGlobalService } from '../services/media-global';
import { RegistroUsoService } from '../services/registro-uso';
import { SPAFilialService } from '../services/spa-filial';
import { DisponibilidadeRegiaoService } from '../services/disponibilidade-regiao';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
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
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SPAFilialPage } from '../pages/indicadores-filial/spa-filial';
import { TecnicosDisponibilidadePage } from '../pages/indicadores-tecnico/tecnicos-disponibilidade';
import { MediaGlobalPage } from '../pages/media-global/media-global';
import { DisponibilidadeRegioesPage } from '../pages/disponibilidade-regioes/disponibilidade-regioes';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
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
    ChamadoConsultaPage,
    TecnicosDisponibilidadePage,
    MediaGlobalPage,
    SPAFilialPage,
    TutorialPage,
    DisponibilidadeRegioesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
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
    ChamadoConsultaPage,
    TecnicosDisponibilidadePage,
    MediaGlobalPage,
    SPAFilialPage,
    TutorialPage,
    DisponibilidadeRegioesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    DadosGlobaisService,
    SLAFilialService,
    ChamadosAntigosService,
    PerformanceService,
    ChamadoService,
    SLATecnicoService,
    SLAClienteService,
    SLARegiaoService,
    PendenciaClienteService,
    PendenciaTecnicoService,
    PendenciaRegiaoService,
    ReincidenciaRegiaoService,
    ReincidenciaTecnicoService,
    ReincidenciaClienteService,
    TecnicoDisponibilidadeService,
    MediaGlobalService,
    RegistroUsoService,
    SPAFilialService,
    DisponibilidadeRegiaoService
  ]
})
export class AppModule {}
