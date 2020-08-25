import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { Performance } from '../../models/performance';
import { PerformanceService } from '../../services/performance';
import { SPAFilialService } from '../../services/spa-filial';
import { SPAFilial } from '../../models/spa-filial';


@Component({
    selector: 'spa-filial-page',
    template: `
      <ion-header>
        <ion-navbar no-border-bottom>
          <ion-title>SPA das Filiais</ion-title>
        </ion-navbar>
      </ion-header>
  
      <ion-content padding>
        <canvas #barCanvas></canvas>
      </ion-content>`
})
export class SPAFilialPage {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private spaFilialService: SPAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
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

      this.carregarGraficoSPA(labels, data, colors, metas);
      loader.dismiss();
    },
    err => {
      loader.dismiss();
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoSPA(labels: string[], data: number[], colors: string[], metas: number[]) {
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
