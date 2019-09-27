import { Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";


@Component({
  selector: 'pendencia-filial-page',
  templateUrl: 'pendencia-filial.html'
})
export class PendenciaFilialPage {
  nomeFilial: string;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  
  constructor(
    private nav: NavController,
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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
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