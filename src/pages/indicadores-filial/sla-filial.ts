import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';


@Component({
  selector: 'sla-filial-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>SLA da {{ nomeFilial }}</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          SLA
        </ion-card-header>
        <ion-card-content>
          <canvas #barCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class SLAFilialPage {
  nomeFilial: string;
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;
  
  constructor(
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [
          {
            label: "Qtd",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              Config.CONSTANTS.CORES.RGB.VERMELHO,
              Config.CONSTANTS.CORES.RGB.AZUL,
              Config.CONSTANTS.CORES.RGB.AMARELO,
              Config.CONSTANTS.CORES.RGB.ROSA,
              Config.CONSTANTS.CORES.RGB.VERDE,
              Config.CONSTANTS.CORES.RGB.CINZA_ESCURO
            ],
            borderColor: [
              Config.CONSTANTS.CORES.RGB.VERMELHO,
              Config.CONSTANTS.CORES.RGB.AZUL,
              Config.CONSTANTS.CORES.RGB.AMARELO,
              Config.CONSTANTS.CORES.RGB.ROSA,
              Config.CONSTANTS.CORES.RGB.VERDE,
              Config.CONSTANTS.CORES.RGB.CINZA_ESCURO
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
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
    });
  }
}
