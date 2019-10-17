import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { Performance } from '../../models/performance';
import { PerformanceService } from '../../services/performance';


@Component({
    selector: 'indicadores-clientes-page',
    template: `
      <ion-header>
        <ion-navbar no-border-bottom>
          <ion-title>Indicadores dos Clientes</ion-title>
        </ion-navbar>
      </ion-header>
  
      <ion-content padding>
        <canvas #barCanvas></canvas>
      </ion-content>`
})
export class IndicadoresClientesPage {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private performanceService: PerformanceService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.performanceService.buscarPerformanceClientes().subscribe((performances: Performance[]) => {
      let labels: string[] = []
      let data: number[] = []
      let colors: string[] = []
      let metas: number[] = []

      performances
      .sort(function(a, b) { 
        return ((a.sla > b.sla) ? -1 : ((a.sla < b.sla) ? 1 : 0));
      })
      .forEach(p => {
        labels.push(p.nomeCliente);
        data.push(p.sla);

        if (p.sla >= 95) {
          colors.push(Config.CONSTANTS.CORES.RGB.VERDE);
        } else if (p.sla >= 92 && p.sla < 95) {
          colors.push(Config.CONSTANTS.CORES.RGB.AMARELO);
        } else {
          colors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
        }
        metas.push(95.0);
      });

      this.carregarGraficoSLA(labels, data, colors, metas);
      loader.dismiss();
    },
    err => {
      loader.dismiss();
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoSLA(labels: string[], data: number[], colors: string[], metas: number[]) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
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
