import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from 'ionic-angular';
import { Config } from '../../models/config';

@Component({
  selector: 'doughnut-chart',
  templateUrl: 'doughnut-chart.html'
})
export class DoughnutChartPage {
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  
  constructor(
    public navCtrl: NavController
  ) {}

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
