import { Component, ViewChild, ElementRef, Input} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Chart } from "chart.js";

import { Config } from '../../models/config';
import { PerformanceService } from '../../services/performance';
import { Performance } from '../../models/performance';


@Component({
  selector: 'resultado-geral-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Resultado Geral das Filiais</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          SLA <span ion-text>Meta >= 95%</span>
        </ion-card-header>
        
        <ion-card-content>
          <canvas #slaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Pendência <span ion-text>Meta <= 5%</span>
        </ion-card-header>
        <ion-card-content>
          <canvas #pendenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Reincidência <span ion-text>Meta <= 35%</span>
        </ion-card-header>
        <ion-card-content>
          <canvas #reincidenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          SPA <span ion-text>Meta >= 85%</span>
        </ion-card-header>
        <ion-card-content>
          <canvas #spaCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ResultadoGeralPage {
  performances: Performance[] = [];
  status: boolean = false;
  @ViewChild("slaCanvas") slaCanvas: ElementRef;
  slaChart: Chart;
  @ViewChild("pendenciaCanvas") pendenciaCanvas: ElementRef;
  pendenciaChart: Chart;
  @ViewChild("reincidenciaCanvas") reincidenciaCanvas: ElementRef;
  reincidenciaChart: Chart;
  @ViewChild("spaCanvas") spaCanvas: ElementRef;
  spaChart: Chart;
  private labels: string[] = [];
  private datasetSLA: any[] = [];
  private datasetPendencia: any[] = [];
  private datasetReincidencia: any[] = [];
  
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private performanceService: PerformanceService
  ) {}

  ngOnInit() {
    this.performanceService.buscarPerformance().subscribe((dados: Performance[]) => {
      this.status = true;
      this.performances = dados;
      this.labels = dados.map((i) => { return this.carregarNomeMes(i['anoMes']) });
      let slas: number[] = dados.map((i) => { return i['sla'] });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.HEXA.VERMELHO });

      this.datasetSLA.push(
        {
          label: 'SLA',
          data: slas,
          backgroundColor: bgColors,
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: metas,
          backgroundColor: metaColors,
          borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 5,
          type: 'line'
        }
      );

      let pendencias = dados.map((i) => { return i['pendencia'] });
      metas = slas.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      
      this.datasetPendencia.push(
        {
          label: 'Pendência',
          data: pendencias,
          backgroundColor: bgColors,
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: metas,
          backgroundColor: metaColors,
          borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 5,
          type: 'line'
        }
      );

      let reincidencias = dados.map((i) => { return i['reincidencia'] });
      metas = slas.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });

      this.datasetReincidencia.push(
        {
          label: 'Reincidência',
          data: reincidencias,
          backgroundColor: bgColors,
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: metas,
          backgroundColor: metaColors,
          borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 5,
          type: 'line'
        }
      );

      this.carregarGraficoSLA().then(() => {}).catch(() => {});
      this.carregarGraficoPendencia().then(() => {}).catch(() => {});
      this.carregarGraficoReincidencia().then(() => {}).catch(() => {});
    },
    err => {
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });

    this.performanceService.buscarSPAGeral().subscribe((spa: Performance[]) => {
      let labelsSPA: string[] = spa.map((i) => { return this.carregarNomeMes(i['anoMes']) });
      let valuesSPA: number[] = spa.map((i) => { return Number(i['spa']) });
      let colorsSPA: string[] = [];
      spa.map((i) => { 
        if (i['spa'] >= Config.CONSTANTS.METAS.SPA.M1) {
          colorsSPA.push(Config.CONSTANTS.CORES.RGB.VERDE);
        }
        else {
          colorsSPA.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
        }
      });
      

      this.carregarGraficoSPA(labelsSPA, valuesSPA, colorsSPA).then(() => {}).catch(() => {});  
    }, e => {});
  }

  private carregarGraficoSLA(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.slaChart = new Chart(this.slaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetSLA
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      }).then(() => { resolve() }).catch(e => { reject() });
    });
  }

  private carregarGraficoPendencia(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pendenciaChart = new Chart(this.pendenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetPendencia
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      }).then(() => { resolve() }).catch(e => { reject() });
    });
  }

  private carregarGraficoReincidencia(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.reincidenciaChart = new Chart(this.reincidenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetReincidencia
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      }).then(() => { resolve() }).catch(e => { reject() });
    });
  }

  private carregarNomeMes(anoMes: string): string {
    switch(anoMes) {
      case '202001':
        return 'Janeiro';
      case '202002':
        return 'Fevereiro';
      case '202003':
        return 'Março';
      case '202004':
        return 'Abril';
      case '202005':
        return 'Maio';
      case '202006':
        return 'Junho';
      case '202007':
        return 'Julho';
      case '202008':
        return 'Agosto';
      case '202009':
        return 'Setembro';
      case '202010':
        return 'Outubro';
      case '202011':
        return 'Novembro';
      case '202012':
        return 'Dezembro';
      default:
        return '';
    }
  }

  private carregarGraficoSPA(labels: string[], values: number[], colorsSPA: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spaChart = new Chart(this.spaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: 'SPA',
              data: values,
              backgroundColor: colorsSPA,
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: [85,85,85,85],
              backgroundColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 5,
              type: 'line'
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      }).then(() => { resolve() }).catch(e => { reject() });
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
