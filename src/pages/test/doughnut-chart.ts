import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from 'ionic-angular';

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
