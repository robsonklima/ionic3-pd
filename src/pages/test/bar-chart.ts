import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from 'ionic-angular';
import { Config } from '../../models/config';

@Component({
  selector: 'bar-chart',
  templateUrl: 'bar-chart.html'
})
export class BarChartPage {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  
  constructor(
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
              Config.CONSTANTS.CORES.HEXA.VERMELHO, 
              Config.CONSTANTS.CORES.HEXA.AZUL, 
              Config.CONSTANTS.CORES.HEXA.AMARELO, 
              Config.CONSTANTS.CORES.HEXA.ROSA, 
              Config.CONSTANTS.CORES.HEXA.VERDE, 
              Config.CONSTANTS.CORES.HEXA.CINZA_ESCURO
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
