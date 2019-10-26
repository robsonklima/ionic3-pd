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
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.slaRegiaoService.buscarSLARegioes(this.slaFilial.codFilial).subscribe((slas: SLARegiao[]) => {
      if (slas.length < 4) return;

      this.regioesChart = new Chart(this.regioesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            slas[0].nomeRegiao.replace(/ .*/,''), 
            slas[1].nomeRegiao.replace(/ .*/,''), 
            slas[2].nomeRegiao.replace(/ .*/,''), 
            slas[3].nomeRegiao.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [slas[0].percentual, slas[1].percentual, slas[2].percentual, slas[3].percentual],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO,
                Config.CONSTANTS.CORES.RGB.VERMELHO
              ],
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: [ 95.0, 95.0, 95.0, 95.0 ],
              backgroundColor: [ 
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
              ],
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
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
      if (slas.length < 4) return;

      this.clientesChart = new Chart(this.clientesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            slas[0].nomeCliente.replace(/ .*/,''), 
            slas[1].nomeCliente.replace(/ .*/,''), 
            slas[2].nomeCliente.replace(/ .*/,''), 
            slas[3].nomeCliente.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [slas[0].percentual, slas[1].percentual, slas[2].percentual, slas[3].percentual],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE,
                Config.CONSTANTS.CORES.RGB.VERDE
              ],
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: [ 95.0, 95.0, 95.0, 95.0 ],
              backgroundColor: [ 
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
              ],
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
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
      if (slas.length < 4) return;

      this.tecnicosChart = new Chart(this.tecnicosCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            slas[0].nomeTecnico.replace(/ .*/,''), 
            slas[1].nomeTecnico.replace(/ .*/,''), 
            slas[2].nomeTecnico.replace(/ .*/,''), 
            slas[3].nomeTecnico.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [slas[0].percentual, slas[1].percentual, slas[2].percentual, slas[3].percentual],
              backgroundColor: [
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL
              ],
              borderColor: [
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL,
                Config.CONSTANTS.CORES.RGB.AZUL
              ],
              borderWidth: 1
            },
            {
              label: 'Meta',
              data: [ 95.0, 95.0, 95.0, 95.0 ],
              backgroundColor: [ 
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
                Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO, Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO
              ],
              borderColor: Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO,
              borderWidth: 1,
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
