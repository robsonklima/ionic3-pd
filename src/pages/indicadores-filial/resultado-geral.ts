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
          SLA
        </ion-card-header>
        
        <ion-card-content>
          <ion-spinner [ngClass]="!status ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="status ? 'visible' : 'hide'" #slaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Pendência
        </ion-card-header>
        <ion-card-content>
        <ion-spinner [ngClass]="!status ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="status ? 'visible' : 'hide'" #pendenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Reincidência
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!status ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="status ? 'visible' : 'hide'" #reincidenciaCanvas></canvas>
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

      this.performances.forEach(p => { this.labels.push(this.carregarNomeMes(p.anoMes)) });

      this.datasetSLA.push(
        {
          label: 'SLA',
          data: [
            this.performances[0].sla, this.performances[1].sla, this.performances[2].sla, this.performances[3].sla
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: [ 
            Config.CONSTANTS.METAS.SLA.M1, Config.CONSTANTS.METAS.SLA.M1, 
            Config.CONSTANTS.METAS.SLA.M1, Config.CONSTANTS.METAS.SLA.M1 
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
          ],
          borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 5,
          type: 'line'
        }
      );

      this.datasetPendencia.push(
        {
          label: 'Pendência',
          data: [ 
            this.performances[0].pendencia, this.performances[1].pendencia, 
            this.performances[2].pendencia, this.performances[3].pendencia 
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: [ 
            Config.CONSTANTS.METAS.PENDENCIA.M1, Config.CONSTANTS.METAS.PENDENCIA.M1, 
            Config.CONSTANTS.METAS.PENDENCIA.M1, Config.CONSTANTS.METAS.PENDENCIA.M1 
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
          ],
          borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 5,
          type: 'line'
        }
      );

      this.datasetReincidencia.push(
        {
          label: 'Reincidência',
          data: [
            this.performances[0].reincidencia, this.performances[1].reincidencia, 
            this.performances[2].reincidencia, this.performances[3].reincidencia
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: [ 
            Config.CONSTANTS.METAS.REINCIDENCIA.M1, Config.CONSTANTS.METAS.REINCIDENCIA.M1, 
            Config.CONSTANTS.METAS.REINCIDENCIA.M1, Config.CONSTANTS.METAS.REINCIDENCIA.M1 
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
            Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
          ],
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
          // animation: {
          //   onProgress: a => {
          //     let p = Math.round(a.animationObject.currentStep / a.animationObject.numSteps * 100);
          //   }
          // },
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
                  beginAtZero: false
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
                  beginAtZero: false
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
                  beginAtZero: false
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
      case '201901':
        return 'Janeiro';
      case '201902':
        return 'Fevereiro';
      case '201903':
        return 'Março';
      case '201904':
        return 'Abril';
      case '201905':
        return 'Maio';
      case '201906':
        return 'Junho';
      case '201907':
        return 'Julho';
      case '201908':
        return 'Agosto';
      case '201909':
        return 'Setembro';
      case '201910':
        return 'Outubro';
      case '201911':
        return 'Novembro';
      case '201912':
        return 'Dezembro';
      default:
        return '';
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
