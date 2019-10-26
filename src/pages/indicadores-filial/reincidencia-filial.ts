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
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.reincidenciaRegiaoService.buscarReincidenciaRegioes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaRegiao[]) => {
      if (reincidencias.length < 4) return;

      this.regioesChart = new Chart(this.regioesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            reincidencias[0].nomeRegiao.replace(/ .*/,''), 
            reincidencias[1].nomeRegiao.replace(/ .*/,''), 
            reincidencias[2].nomeRegiao.replace(/ .*/,''), 
            reincidencias[3].nomeRegiao.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                reincidencias[0].percentual, reincidencias[1].percentual, 
                reincidencias[2].percentual, reincidencias[3].percentual
              ],
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
    
    this.reincidenciaClienteService.buscarReincidenciaClientes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaCliente[]) => {
      if (reincidencias.length < 4) return;

      this.clientesChart = new Chart(this.clientesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            reincidencias[0].nomeCliente.replace(/ .*/,''), 
            reincidencias[1].nomeCliente.replace(/ .*/,''), 
            reincidencias[2].nomeCliente.replace(/ .*/,''), 
            reincidencias[3].nomeCliente.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                reincidencias[0].percentual, reincidencias[1].percentual, 
                reincidencias[2].percentual, reincidencias[3].percentual
              ],
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

    this.reincidenciaTecnicoService.buscarReincidenciaTecnicos(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaTecnico[]) => {
      if (reincidencias.length < 4) return;

      this.tecnicosChart = new Chart(this.tecnicosCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            reincidencias[0].nomeTecnico.replace(/ .*/,''), 
            reincidencias[1].nomeTecnico.replace(/ .*/,''), 
            reincidencias[2].nomeTecnico.replace(/ .*/,''), 
            reincidencias[3].nomeTecnico.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                reincidencias[0].percentual, reincidencias[1].percentual, 
                reincidencias[2].percentual, reincidencias[3].percentual
              ],
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
