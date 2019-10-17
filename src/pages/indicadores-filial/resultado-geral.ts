import { Component, ViewChild, ElementRef} from '@angular/core';
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
        <ion-title>Resultado Geral - Todas as Filiais</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          SLA
        </ion-card-header>
        <ion-card-content>
          <canvas #slaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Pendência
        </ion-card-header>
        <ion-card-content>
          <canvas #pendenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Reincidência
        </ion-card-header>
        <ion-card-content>
          <canvas #reincidenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ResultadoGeralPage {
  performances: Performance[] = [];
  @ViewChild("slaCanvas") slaCanvas: ElementRef;
  public slaChart: Chart;
  @ViewChild("pendenciaCanvas") pendenciaCanvas: ElementRef;
  public pendenciaChart: Chart;
  @ViewChild("reincidenciaCanvas") reincidenciaCanvas: ElementRef;
  public reincidenciaChart: Chart;
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
      this.performances = dados;

      this.performances.forEach(p => {
        this.labels.push(this.carregarNomeMes(p.anoMes));
      });

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
            95.0, 95.0, 95.0, 95.0
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL
          ],
          borderWidth: 1
        }
      );

      this.datasetPendencia.push(
        {
          label: 'Pendência',
          data: [ 
            this.performances[0].pendencia, this.performances[1].pendencia, 
            this.performances[2].pendencia, this.performances[3].pendencia 
          ],
          backgroundColor: [ Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: [
            3.0, 3.0, 3.0, 3.0
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL
          ],
          borderWidth: 1
        }
      );

      this.datasetReincidencia.push(
        {
          label: 'Reincidência',
          data: [
            this.performances[0].reincidencia, this.performances[1].reincidencia, 
            this.performances[2].reincidencia, this.performances[3].reincidencia
          ],
          backgroundColor: [ Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: [
            32.0, 32.0, 32.0, 32.0
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL, Config.CONSTANTS.CORES.RGB.AZUL
          ],
          borderWidth: 1
        }
      );

      this.carregarGraficoSLA().then(() => {}).catch(() => {});
      this.carregarGraficoPendencia().then(() => {}).catch(() => {});
      this.carregarGraficoReincidencia().then(() => {}).catch(() => {});
    },
    err => {
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
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
          legend: {
            position: 'top',
            display: false,
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
            display: false,
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
            display: false,
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
