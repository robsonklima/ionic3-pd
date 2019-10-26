import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Chart } from "chart.js";
import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLACliente } from '../../models/sla-cliente';
import { SLATecnico } from '../../models/sla-tecnico';
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
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present().then(() => { setTimeout(() => { loader.dismiss() }, 1000) });
    
    this.pendenciaRegiaoService.buscarPendenciaRegioes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaRegiao[]) => {
      if (pendencias.length < 4) return;

      this.regioesChart = new Chart(this.regioesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            pendencias[0].nomeRegiao.replace(/ .*/,''), 
            pendencias[1].nomeRegiao.replace(/ .*/,''), 
            pendencias[2].nomeRegiao.replace(/ .*/,''), 
            pendencias[3].nomeRegiao.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                pendencias[0].percentual, pendencias[1].percentual, 
                pendencias[2].percentual, pendencias[3].percentual
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
    
    this.pendenciaClienteService.buscarPendenciaClientes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaCliente[]) => {
      if (pendencias.length < 4) return;

      this.clientesChart = new Chart(this.clientesCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            pendencias[0].nomeCliente.replace(/ .*/,''), 
            pendencias[1].nomeCliente.replace(/ .*/,''), 
            pendencias[2].nomeCliente.replace(/ .*/,''), 
            pendencias[3].nomeCliente.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                pendencias[0].percentual, pendencias[1].percentual, 
                pendencias[2].percentual, pendencias[3].percentual
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

    this.pendenciaTecnicoService.buscarPendenciaTecnicos(this.slaFilial.codFilial).subscribe((pendencias: PendenciaTecnico[]) => {
      if (pendencias.length < 4) return;

      this.tecnicosChart = new Chart(this.tecnicosCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: [
            pendencias[0].nomeTecnico.replace(/ .*/,''), 
            pendencias[1].nomeTecnico.replace(/ .*/,''), 
            pendencias[2].nomeTecnico.replace(/ .*/,''), 
            pendencias[3].nomeTecnico.replace(/ .*/,''), 
          ],
          datasets: [
            {
              label: "%",
              data: [
                pendencias[0].percentual, pendencias[1].percentual, 
                pendencias[2].percentual, pendencias[3].percentual
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
