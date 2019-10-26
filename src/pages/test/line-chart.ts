import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.html'
})
export class LineChartPage {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  public lineChart: Chart;
  
  constructor(
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
          {
            label: "A",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 12, 78, 79, 90, 99],
            spanGaps: false
          },
          {
            label: "C",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,0,0,0.4)",
            borderColor: "rgba(255,0,0,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255,0,0,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,0,0,1)",
            pointHoverBorderColor: "rgba(255,0,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 6, 12, 23, 34, 40, 41, 35, 34, 70, 71, 98],
            spanGaps: false
          },
          {
          
            label: "Média",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(128,128,128,0.3)",
            borderColor: "rgba(128,128,128,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(128,128,128,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 1,
            pointHoverBackgroundColor: "rgba(128,128,128,1)",
            pointHoverBorderColor: "rgba(128,128,128,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [12, 30, 45, 38, 12, 10, 7, 58, 30, 38, 30, 30],
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false
            },
          }]
        },
        legend: {
          display: false,
        }
      }
    });
  }
}
