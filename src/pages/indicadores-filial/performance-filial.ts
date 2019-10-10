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
          Performance
        </ion-card-header>
        <ion-card-content>
          <canvas #barCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class PerformanceFilialPage {
  slaFilial: SLAFilial;
  performances: Performance[] = [];
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;
  private labels: string[] = [];
  private datasets: any[] = [];

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
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.performanceService.buscarPerformance(this.slaFilial.codFilial).subscribe((performances: Performance[]) => {
        this.performances = performances;

        this.performances.forEach(p => {
          this.labels.push(this.carregarNomeMes(p.anoMes));
        });

        this.datasets.push({
          label: 'SLA',
          data: [this.performances[0].sla, this.performances[1].sla, this.performances[2].sla, this.performances[3].sla],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO,
            Config.CONSTANTS.CORES.RGB.VERMELHO
          ],
          borderWidth: 1
        });

        this.datasets.push({
          label: 'Pendência',
          data: [this.performances[0].pendencia, this.performances[1].pendencia, 
                 this.performances[2].pendencia, this.performances[3].pendencia],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE,
            Config.CONSTANTS.CORES.RGB.VERDE
          ],
          borderWidth: 1
        });

        this.datasets.push({
          label: 'Reincidência',
          data: [this.performances[0].reincidencia, this.performances[1].reincidencia, 
                 this.performances[2].reincidencia, this.performances[3].reincidencia],
          backgroundColor: [ 
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL
          ],
          borderColor: [ 
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL,
            Config.CONSTANTS.CORES.RGB.AZUL
          ],
          borderWidth: 1
        });

        this.carregarGrafico().then(() => { loader.dismiss() }).catch(e => { loader.dismiss() });
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
  }

  private carregarGrafico(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasets
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
