import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams, LoadingController, NavController, AlertController } from 'ionic-angular';
import { Chart } from "chart.js";

import { Performance } from '../../models/performance';
import { PerformanceService } from '../../services/performance';
import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';


@Component({
  selector: 'performance-filial-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Performance da Filial {{ slaFilial.nomeFilial }}</ion-title>
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
export class PerformanceFilialPage {
  slaFilial: SLAFilial;
  performances: Performance[] = [];
  @ViewChild("slaCanvas") slaCanvas: ElementRef;
  @ViewChild("pendenciaCanvas") pendenciaCanvas: ElementRef;
  @ViewChild("reincidenciaCanvas") reincidenciaCanvas: ElementRef;
  public slaChart: Chart;
  public pendenciaChart: Chart;
  public reincidenciaChart: Chart;
  private labels: string[] = [];
  private datasetsSLA: any[] = [];
  private datasetsPendencia: any[] = [];
  private datasetsReincidencia: any[] = [];

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private performanceService: PerformanceService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.performanceService.buscarPerformancePorFilial(this.slaFilial.codFilial).subscribe((performances: Performance[]) => {
        this.performances = performances;

        this.performances.forEach(p => {
          this.labels.push(this.carregarNomeMes(p.anoMes));
        });

        this.datasetsSLA.push({
          label: 'SLA',
          data: [
            this.performances[0].sla, this.performances[1].sla, 
            this.performances[2].sla, this.performances[3].sla
          ],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        });

        this.datasetsSLA.push({
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
          type: 'line'
        });

        this.datasetsPendencia.push({
          label: 'Pendência',
          data: [this.performances[0].pendencia, this.performances[1].pendencia, 
                 this.performances[2].pendencia, this.performances[3].pendencia],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        });

        this.datasetsPendencia.push({
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
          type: 'line'
        });

        this.datasetsReincidencia.push({
          label: 'Reincidência',
          data: [this.performances[0].reincidencia, this.performances[1].reincidencia, 
                 this.performances[2].reincidencia, this.performances[3].reincidencia],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE, Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        });

        this.datasetsReincidencia.push({
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
          type: 'line'
        });

        this.carregarGraficoSLA().then(() => {}).catch(e => {});
        this.carregarGraficoPendencia().then(() => {}).catch(e => {});
        this.carregarGraficoReincidencia().then(() => {}).catch(e => {});
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { 
          this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
  }

  private carregarGraficoSLA(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.slaChart = new Chart(this.slaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetsSLA
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
      }).then(() => { resolve() }).catch(() => { reject() });
    });
  }

  private carregarGraficoPendencia(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.pendenciaChart = new Chart(this.pendenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetsPendencia
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

  private carregarGraficoReincidencia(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.reincidenciaChart = new Chart(this.reincidenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasetsReincidencia
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
