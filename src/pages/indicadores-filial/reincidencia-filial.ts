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
export class ReincidenciaFilialPage {
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
    private reincidenciaRegiaoService: ReincidenciaRegiaoService,
    private reincidenciaTecnicoService: ReincidenciaTecnicoService,
    private reincidenciaClienteService: ReincidenciaClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.reincidenciaRegiaoService.buscarReincidenciaRegioes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaRegiao[]) => {
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
    
    this.reincidenciaClienteService.buscarReincidenciaClientes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaCliente[]) => {
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

    this.reincidenciaTecnicoService.buscarReincidenciaTecnicos(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaTecnico[]) => {
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
