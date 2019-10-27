import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
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
          <canvas #regioesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Clientes
        </ion-card-header>
        <ion-card-content>
          <canvas #clientesCanvas></canvas>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Técnicos
        </ion-card-header>
        <ion-card-content>
          <canvas #tecnicosCanvas></canvas>
        </ion-card-content>
      </ion-card>
    </ion-content>`
})
export class SLAFilialPage {
  slaFilial: SLAFilial;
  @ViewChild("regioesCanvas") regioesCanvas: ElementRef;
  public regioesChart: Chart;
  @ViewChild("clientesCanvas") clientesCanvas: ElementRef;
  public clientesChart: Chart;
  @ViewChild("tecnicosCanvas") tecnicosCanvas: ElementRef;
  public tecnicosChart: Chart;
  
  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private slaRegiaoService: SLARegiaoService,
    private slaTecnicoService: SLATecnicoService,
    private slaClienteService: SLAClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.slaRegiaoService.buscarSLARegioes(this.slaFilial.codFilial).subscribe((slas: SLARegiao[]) => {
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
