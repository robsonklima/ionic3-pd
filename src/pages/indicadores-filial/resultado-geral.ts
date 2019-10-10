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
          Todas as Filiais
        </ion-card-header>
        <ion-card-content>
          <canvas #barCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ResultadoGeralPage {
  slaFiliais: SLAFilial[] = [];
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private slaFilialService: SLAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
        this.slaFiliais = dados;
        this.carregarGrafico().then(() => { loader.dismiss() }).catch(() => { loader.dismiss() });
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
  }

  private carregarGrafico(): Promise<any>  {
    let sla, pendencia, reincidencia;
    
    this.slaFiliais.forEach(e => {
      if(e.nomeFilial == 'TOTAL') {
        sla = e.percentual.toFixed(2);
        pendencia = (this.slaFiliais.reduce(function(prev, cur) { return prev + (cur.pendencia) }, 0) / this.slaFiliais.length-1).toFixed(2);
        reincidencia = (this.slaFiliais.reduce(function(prev, cur) { return prev + (cur.reincidencia) }, 0) / this.slaFiliais.length-1).toFixed(2);
      }
    });

    return new Promise((resolve, reject) => {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["SLA", "Pendência", "Reincidência"],
          datasets: [
            {
              label: "%",
              data: [sla, pendencia, reincidencia],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.VERDE
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.AZUL,
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
