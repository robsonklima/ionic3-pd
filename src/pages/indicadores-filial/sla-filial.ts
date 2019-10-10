import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from "chart.js";


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
  private barChart: Chart;
  
  constructor(
    private navParams: NavParams
  ) {
    this.nomeFilial = this.navParams.get('nomeFilial');
  }

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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
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
