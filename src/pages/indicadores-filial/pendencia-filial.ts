import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { PendenciaRegiaoService } from '../../services/pendencia-regiao';
import { PendenciaTecnicoService } from '../../services/pendencia-tecnico';
import { PendenciaClienteService } from '../../services/pendencia-cliente';
import { PendenciaRegiao } from '../../models/pendencia-regiao';
import { PendenciaCliente } from '../../models/pendencia-cliente';
import { PendenciaTecnico } from '../../models/pendencia-tecnico';


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
export class PendenciaFilialPage {
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
    private pendenciaRegiaoService: PendenciaRegiaoService,
    private pendenciaTecnicoService: PendenciaTecnicoService,
    private pendenciaClienteService: PendenciaClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.pendenciaRegiaoService.buscarPendenciaRegioes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaRegiao[]) => {
      let labels: string[] = pendencias.map((i) => { return i['nomeRegiao'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

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
    
    this.pendenciaClienteService.buscarPendenciaClientes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaCliente[]) => {
      let labels: string[] = pendencias.map((i) => { return i['nomeCliente'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

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

    this.pendenciaTecnicoService.buscarPendenciaTecnicos(this.slaFilial.codFilial).subscribe((pendencias: PendenciaTecnico[]) => {
      let labels: string[] = pendencias.map((i) => { return i['nomeTecnico'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

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
