import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Chart } from "chart.js";

import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLAFilialService } from '../../services/sla-filial';


@Component({
  selector: 'resultado-geral-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Resultado Geral</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          SLA de Todas as Filiais
        </ion-card-header>
        <ion-card-content>
          <canvas #slaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Pendência de Todas as Filiais
        </ion-card-header>
        <ion-card-content>
          <canvas #pendenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Reincidência de Todas as Filiais
        </ion-card-header>
        <ion-card-content>
          <canvas #reincidenciaCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ResultadoGeralPage {
  slaFiliais: SLAFilial[] = [];
  @ViewChild("slaCanvas") slaCanvas: ElementRef;
  public slaChart: Chart;
  @ViewChild("pendenciaCanvas") pendenciaCanvas: ElementRef;
  public pendenciaChart: Chart;
  @ViewChild("reincidenciaCanvas") reincidenciaCanvas: ElementRef;
  public reincidenciaChart: Chart;
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private slaFilialService: SLAFilialService
  ) {}

  ngOnInit() {
    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      this.slaFiliais = dados;

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
      let sla;
    
      this.slaFiliais.forEach(e => {
        if(e.nomeFilial == 'TOTAL') {
          sla = e.percentual.toFixed(2);
        }
      });

      this.slaChart = new Chart(this.slaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["SLA"],
          datasets: [
            {
              label: "%",
              data: [sla],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO
              ],
              borderWidth: 1
            }
          ]
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
      let pendencia;

      console.log('OLA');
      
    
      this.slaFiliais.forEach(e => {
        if(e.nomeFilial == 'TOTAL') {
          pendencia = (this.slaFiliais.reduce(function(prev, cur) { return prev + (cur.pendencia) }, 0) / this.slaFiliais.length-1).toFixed(2);
        }
      });

      this.pendenciaChart = new Chart(this.pendenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["Pendência"],
          datasets: [
            {
              label: "%",
              data: [pendencia],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.AZUL
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.AZUL
              ],
              borderWidth: 1
            }
          ]
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
      let reincidencia;
    
      this.slaFiliais.forEach(e => {
        if(e.nomeFilial == 'TOTAL') {
          reincidencia = (this.slaFiliais.reduce(function(prev, cur) { return prev + (cur.reincidencia) }, 0) / this.slaFiliais.length-1).toFixed(2);
        }
      });

      this.reincidenciaChart = new Chart(this.reincidenciaCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["Reincidência"],
          datasets: [
            {
              label: "%",
              data: [reincidencia],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.VERDE
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.VERDE
              ],
              borderWidth: 1
            }
          ]
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

  private exibirAlerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: null,
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}
