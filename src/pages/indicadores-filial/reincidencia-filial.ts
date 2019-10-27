import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { ReincidenciaRegiaoService } from '../../services/reincidencia-regiao';
import { ReincidenciaTecnicoService } from '../../services/reincidencia-tecnico';
import { ReincidenciaClienteService } from '../../services/reincidencia-cliente';
import { ReincidenciaRegiao } from '../../models/reincidencia-regiao';
import { ReincidenciaCliente } from '../../models/reincidencia-cliente';
import { ReincidenciaTecnico } from '../../models/reincidencia-tecnico';


@Component({
  selector: 'pendencia-filial-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Pendência da {{ slaFilial.nomeFilial }}</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          Regiões
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!regioesChartStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="regioesChartStatus ? 'visible' : 'hide'" #regioesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Clientes
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!clientesChartStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="clientesChartStatus ? 'visible' : 'hide'" #clientesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Técnicos
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!tecnicosChartStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="tecnicosChartStatus ? 'visible' : 'hide'" #tecnicosCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class ReincidenciaFilialPage {
  slaFilial: SLAFilial;
  @ViewChild("regioesCanvas") regioesCanvas: ElementRef;
  public regioesChart: Chart;
  regioesChartStatus: boolean = false;
  @ViewChild("clientesCanvas") clientesCanvas: ElementRef;
  public clientesChart: Chart;
  clientesChartStatus: boolean = false;
  @ViewChild("tecnicosCanvas") tecnicosCanvas: ElementRef;
  public tecnicosChart: Chart;
  tecnicosChartStatus: boolean = false;
  
  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private reincidenciaRegiaoService: ReincidenciaRegiaoService,
    private reincidenciaTecnicoService: ReincidenciaTecnicoService,
    private reincidenciaClienteService: ReincidenciaClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    this.reincidenciaRegiaoService.buscarReincidenciaRegioes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaRegiao[]) => {
      this.regioesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeRegiao'].replace(/ .*/,'') });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.regioesChart = new Chart(this.regioesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "%",
              data: values,
              backgroundColor: bgColors,
              borderColor: bgColors,
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: metas,
              backgroundColor: metaColors,
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 5,
              type: 'line'
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    });  
    
    this.reincidenciaClienteService.buscarReincidenciaClientes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaCliente[]) => {
      this.clientesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeCliente'].replace(/ .*/,'') });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.clientesChart = new Chart(this.clientesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "%",
              data: values,
              backgroundColor: bgColors,
              borderColor: bgColors,
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: metas,
              backgroundColor: metaColors,
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 5,
              type: 'line'
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    }); 

    this.reincidenciaTecnicoService.buscarReincidenciaTecnicos(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaTecnico[]) => {
      this.tecnicosChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeTecnico'].replace(/ .*/,'') });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.tecnicosChart = new Chart(this.tecnicosCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "%",
              data: values,
              backgroundColor: bgColors,
              borderColor: bgColors,
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: metas,
              backgroundColor: metaColors,
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 5,
              type: 'line'
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            display: true,
            labels: {
              boxWidth: 12,
              padding: 10
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    }); 
  }
}
