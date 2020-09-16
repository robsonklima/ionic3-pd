import { Component, ViewChild, ElementRef} from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLAFilialService } from '../../services/sla-filial';
import { Chart } from "chart.js";
import { SPAFilialService } from '../../services/spa-filial';
import { SPAFilial } from '../../models/spa-filial';


@Component({
  selector: 'indicadores-filiais-page',
  templateUrl: 'indicadores-filiais.html'
})
export class IndicadoresFiliaisPage {
  modo: string = "sla";
  sla: SLAFilial[] = [];
  pendencia: SLAFilial[] = [];
  reincidencia: SLAFilial[] = [];

  slaChart: Chart;
  @ViewChild("slaCanvas") slaCanvas: ElementRef;
  spaChart: Chart;
  @ViewChild("spaCanvas") spaCanvas: ElementRef;
  reincChart: Chart;
  @ViewChild("reincCanvas") reincCanvas: ElementRef;
  pendChart: Chart;
  @ViewChild("pendCanvas") pendCanvas: ElementRef;

  metaSLA1: number = Config.CONSTANTS.METAS.SLA.M1;
  metaSLA2: number = Config.CONSTANTS.METAS.SLA.M2;
  metaReincidencia1: number = Config.CONSTANTS.METAS.REINCIDENCIA.M1;
  metaReincidencia2: number = Config.CONSTANTS.METAS.REINCIDENCIA.M2;
  metaPendencia1: number = Config.CONSTANTS.METAS.PENDENCIA.M1;
  metaPendencia2: number = Config.CONSTANTS.METAS.PENDENCIA.M2;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private slaFilialService: SLAFilialService,
    private spaFilialService: SPAFilialService
  ) {}

  ngOnInit() {
    this.carregarGraficoSLA();
  }

  private carregarGraficoSLA() {
    const loader = this.loadingCtrl.create({ content: 'Carregando gráfico de SLA' });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      let slaLabels: string[] = [];
      let slaColors: string[] = [];
      let slaValues: number[] = [];

      this.sla = dados.sort(function(a, b) { 
        return ((a.percentual > b.percentual) ? -1 : ((a.percentual < b.percentual) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });
      
      this.sla.forEach(el => {
        slaLabels.push(el.nomeFilial);

        if (el.percentual > Config.CONSTANTS.METAS.SLA.M1) {
          slaColors.push(Config.CONSTANTS.CORES.RGB.VERDE);
        } else if (el.percentual >= Config.CONSTANTS.METAS.SLA.M2 && el.percentual <= Config.CONSTANTS.METAS.SLA.M1) {
          slaColors.push(Config.CONSTANTS.CORES.RGB.AMARELO);
        } else if (el.percentual < Config.CONSTANTS.METAS.SLA.M2) {
          slaColors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
        }
          
        slaValues.push(el.percentual);
      });

      if (!this.slaCanvas) return;

      this.slaChart = new Chart(this.slaCanvas.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: slaLabels,
          datasets: [
            {
              label: "%",
              backgroundColor: slaColors,
              data: slaValues,
              borderWidth: 1
            } 
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: true,
            text: 'SLA - Meta >=95%'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

      loader.dismiss();
    },
    err => {
      loader.dismiss()

      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoReincidencia() {
    const loader = this.loadingCtrl.create({ content: 'Carregando gráfico de Reincidência' });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      let reincLabels: string[] = [];
      let reincColors: string[] = [];
      let reincValues: number[] = [];

      this.reincidencia = dados.sort(function(a, b) { 
        return ((a.reincidencia > b.reincidencia) ? -1 : ((a.reincidencia < b.reincidencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.reincidencia.forEach(el => {
        reincLabels.push(el.nomeFilial);

        if (el.reincidencia < Config.CONSTANTS.METAS.REINCIDENCIA.M2) {
          reincColors.push(Config.CONSTANTS.CORES.RGB.VERDE);
        } else if (el.reincidencia >= Config.CONSTANTS.METAS.REINCIDENCIA.M2 && el.reincidencia <= Config.CONSTANTS.METAS.REINCIDENCIA.M1) {
          reincColors.push(Config.CONSTANTS.CORES.RGB.AMARELO);
        } else if (el.reincidencia > Config.CONSTANTS.METAS.REINCIDENCIA.M1) {
          reincColors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
        }
          
        reincValues.push(el.reincidencia);
      });

      if (!this.reincCanvas) return;

      this.reincChart = new Chart(this.reincCanvas.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: reincLabels,
          datasets: [
            {
              label: "%",
              backgroundColor: reincColors,
              data: reincValues,
              borderWidth: 1
            } 
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: true,
            text: 'Reincidência - Meta <=35%'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

      loader.dismiss();
    },
    err => {
      loader.dismiss()

      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoPendencia() {
    const loader = this.loadingCtrl.create({ content: 'Carregando gráfico de Pendência' });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      let pendLabels: string[] = [];
      let pendColors: string[] = [];
      let pendValues: number[] = [];

      this.pendencia = dados.sort(function(a, b) { 
        return ((a.pendencia > b.pendencia) ? -1 : ((a.pendencia < b.pendencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.pendencia.forEach(el => {
        pendLabels.push(el.nomeFilial);

        if (el.pendencia < Config.CONSTANTS.METAS.PENDENCIA.M2) {
          pendColors.push(Config.CONSTANTS.CORES.RGB.VERDE);
        } else if (el.pendencia >= Config.CONSTANTS.METAS.PENDENCIA.M2 && el.pendencia <= Config.CONSTANTS.METAS.PENDENCIA.M1) {
          pendColors.push(Config.CONSTANTS.CORES.RGB.AMARELO);
        } else if (el.pendencia > Config.CONSTANTS.METAS.PENDENCIA.M1) {
          pendColors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
        }
          
        pendValues.push(el.pendencia);
      });

      if (!this.pendCanvas) return;

      this.pendChart = new Chart(this.pendCanvas.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: pendLabels,
          datasets: [
            {
              label: "%",
              backgroundColor: pendColors,
              data: pendValues,
              borderWidth: 1
            } 
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: true,
            text: 'Pendência - Meta <=5%'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

      loader.dismiss();
    },
    err => {
      loader.dismiss()

      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoSPA() {
    const loader = this.loadingCtrl.create({ content: 'Carregando gráfico de SPA' });
    loader.present();

    this.spaFilialService.buscarSPAFilial().subscribe((spas: SPAFilial[]) => {
      let labels: string[] = []
      let data: number[] = []
      let colors: string[] = []
      let metas: number[] = []

      spas
        .sort(function(a, b) { return b.percentual - a.percentual })
        .forEach(p => {
          if (p.nomeFilial.length <= 12)
            labels.push(p.nomeFilial);
          else
            labels.push(p.nomeFilial.substring(0, 12));
          
          data.push(p.percentual);

          if (p.percentual >= Config.CONSTANTS.METAS.SPA.M1) {
            colors.push(Config.CONSTANTS.CORES.RGB.VERDE);
          } else {
            colors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
          }

          metas.push(Config.CONSTANTS.METAS.SPA.M1);
      });

      this.spaChart = new Chart(this.spaCanvas.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "%",
              data: data,
              backgroundColor: colors,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: true,
            text: 'SPA - Meta >=85%'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      
      loader.dismiss();
    },
    err => {
      loader.dismiss();
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  public onSegmentChanged($event) {
    if ($event.value == 'sla') {
      this.carregarGraficoSLA();
    } else if ($event.value == 'spa') {
      this.carregarGraficoSPA();
    } else if ($event.value == 'rcd') {
      this.carregarGraficoReincidencia();
    } else if ($event.value == 'pen') {
      this.carregarGraficoPendencia();
    }
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
