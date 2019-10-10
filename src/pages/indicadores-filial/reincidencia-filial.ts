import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';


@Component({
  selector: 'reincidencia-filial-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Reincidência da {{ nomeFilial }}</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          Reincidência
        </ion-card-header>
        <ion-card-content>
          <canvas #doughnutCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ReincidenciaFilialPage {
  nomeFilial: string;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  
  constructor(
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              Config.CONSTANTS.CORES.RGB.VERMELHO,
              Config.CONSTANTS.CORES.RGB.AZUL,
              Config.CONSTANTS.CORES.RGB.AMARELO,
              Config.CONSTANTS.CORES.RGB.ROSA,
              Config.CONSTANTS.CORES.RGB.VERDE,
              Config.CONSTANTS.CORES.RGB.CINZA_ESCURO
            ],
            hoverBackgroundColor: [
              Config.CONSTANTS.CORES.HEXA.VERMELHO, 
              Config.CONSTANTS.CORES.HEXA.AZUL, 
              Config.CONSTANTS.CORES.HEXA.AMARELO, 
              Config.CONSTANTS.CORES.HEXA.ROSA, 
              Config.CONSTANTS.CORES.HEXA.VERDE, 
              Config.CONSTANTS.CORES.HEXA.CINZA_ESCURO
            ]
          }
        ]
      },
      options: {
        legend: {
            position: 'left',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                      label += ': ';
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  
                  return label;
              }
          }
      }
      }
    });
  }
}
