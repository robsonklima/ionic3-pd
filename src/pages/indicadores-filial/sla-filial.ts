import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLARegiao } from '../../models/sla-regiao';
import { SLACliente } from '../../models/sla-cliente';
import { SLARegiaoService } from '../../services/sla-regiao';
import { SLATecnicoService } from '../../services/sla-tecnico';
import { SLAClienteService } from '../../services/sla-cliente';
import { SLATecnico } from '../../models/sla-tecnico';


@Component({
  selector: 'sla-filial-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>SLA da {{ slaFilial.nomeFilial }}</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          Regiões
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!slaRegioesStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="slaRegioesStatus ? 'visible' : 'hide'" #regioesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Clientes
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!slaClientesStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="slaClientesStatus ? 'visible' : 'hide'" #clientesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Técnicos
        </ion-card-header>
        <ion-card-content>
          <ion-spinner [ngClass]="!slaTecnicosStatus ? 'visible' : 'hide'"></ion-spinner>

          <canvas [ngClass]="slaTecnicosStatus ? 'visible' : 'hide'" #tecnicosCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class SLAFilialPage {
  slaFilial: SLAFilial;
  
  @ViewChild("regioesCanvas") regioesCanvas: ElementRef;
  regioesChart: Chart;
  slaRegioesStatus: boolean = false;
  @ViewChild("clientesCanvas") clientesCanvas: ElementRef;
  clientesChart: Chart;
  slaClientesStatus: boolean = false;
  @ViewChild("tecnicosCanvas") tecnicosCanvas: ElementRef;
  tecnicosChart: Chart;
  slaTecnicosStatus: boolean = false;
  
  constructor(
    private navParams: NavParams,
    private slaRegiaoService: SLARegiaoService,
    private slaTecnicoService: SLATecnicoService,
    private slaClienteService: SLAClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    this.slaRegiaoService.buscarSLARegioes(this.slaFilial.codFilial).subscribe((slas: SLARegiao[]) => {
      this.slaRegioesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeRegiao'].replace(/ .*/,'') });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });
        
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
            display: false
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
    
    this.slaClienteService.buscarSLAClientes(this.slaFilial.codFilial).subscribe((slas: SLACliente[]) => {
      this.slaClientesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeCliente'].replace(/ .*/,'') });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

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
            display: false
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

    this.slaTecnicoService.buscarSLATecnicos(this.slaFilial.codFilial).subscribe((slas: SLATecnico[]) => {
      this.slaTecnicosStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeTecnico'].replace(/ .*/,'') });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

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
            display: false
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
