import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
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
  templateUrl: 'pendencia-filial.html'
})
export class PendenciaFilialPage {
  slaFilial: SLAFilial;
  modo: string = "maiores";

  @ViewChild("pendenciaMelhoresRegioesCanvas") pendenciaMelhoresRegioesCanvas: ElementRef;
  pendenciaMelhoresRegioesChart: Chart;
  pendenciaMelhoresRegioesChartStatus: boolean = false;
  @ViewChild("pendenciaMelhoresClientesCanvas") pendenciaMelhoresClientesCanvas: ElementRef;
  pendenciaMelhoresClientesChart: Chart;
  pendenciaMelhoresClientesChartStatus: boolean = false;
  @ViewChild("pendenciaMelhoresTecnicosCanvas") pendenciaMelhoresTecnicosCanvas: ElementRef;
  pendenciaMelhoresTecnicosChart: Chart;
  pendenciaMelhoresTecnicosChartStatus: boolean = false;

  @ViewChild("pendenciaPioresRegioesCanvas") pendenciaPioresRegioesCanvas: ElementRef;
  pendenciaPioresRegioesChart: Chart;
  pendenciaPioresRegioesChartStatus: boolean = false;
  @ViewChild("pendenciaPioresClientesCanvas") pendenciaPioresClientesCanvas: ElementRef;
  pendenciaPioresClientesChart: Chart;
  pendenciaPioresClientesChartStatus: boolean = false;
  @ViewChild("pendenciaPioresTecnicosCanvas") pendenciaPioresTecnicosCanvas: ElementRef;
  pendenciaPioresTecnicosChart: Chart;
  pendenciaPioresTecnicosChartStatus: boolean = false;
  
  constructor(
    private navParams: NavParams,
    private pendenciaRegiaoService: PendenciaRegiaoService,
    private pendenciaTecnicoService: PendenciaTecnicoService,
    private pendenciaClienteService: PendenciaClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    this.carregarDadosMelhores();
  }

  public carregarDadosMelhores() {
    this.pendenciaRegiaoService.buscarPendenciaMelhoresRegioes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaRegiao[]) => {
      this.pendenciaMelhoresRegioesChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeRegiao'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaMelhoresRegioesChart = new Chart(this.pendenciaMelhoresRegioesCanvas.nativeElement, {
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
    
    this.pendenciaClienteService.buscarPendenciaMelhoresClientes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaCliente[]) => {
      this.pendenciaMelhoresClientesChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeCliente'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaMelhoresClientesChart = new Chart(this.pendenciaMelhoresClientesCanvas.nativeElement, {
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

    this.pendenciaTecnicoService.buscarPendenciaPioresTecnicos(this.slaFilial.codFilial).subscribe((pendencias: PendenciaTecnico[]) => {
      this.pendenciaMelhoresTecnicosChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeTecnico'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaMelhoresTecnicosChart = new Chart(this.pendenciaMelhoresTecnicosCanvas.nativeElement, {
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

  public carregarDadosPiores() {
    this.pendenciaRegiaoService.buscarPendenciaPioresRegioes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaRegiao[]) => {
      this.pendenciaPioresRegioesChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeRegiao'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaPioresRegioesChart = new Chart(this.pendenciaPioresRegioesCanvas.nativeElement, {
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
    }, e => { console.log(e) });  
    
    this.pendenciaClienteService.buscarPendenciaPioresClientes(this.slaFilial.codFilial).subscribe((pendencias: PendenciaCliente[]) => {
      this.pendenciaPioresClientesChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeCliente'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaPioresClientesChart = new Chart(this.pendenciaPioresClientesCanvas.nativeElement, {
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

    this.pendenciaTecnicoService.buscarPendenciaPioresTecnicos(this.slaFilial.codFilial).subscribe((pendencias: PendenciaTecnico[]) => {
      this.pendenciaPioresTecnicosChartStatus = true;
      let labels: string[] = pendencias.map((i) => { return i['nomeTecnico'].replace(/ .*/,'') });
      let values: number[] = pendencias.map((i) => { return i['percentual'] });
      let metas: number[] = pendencias.map(() => { return Config.CONSTANTS.METAS.PENDENCIA.M1 });
      let bgColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = pendencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.pendenciaPioresTecnicosChart = new Chart(this.pendenciaPioresTecnicosCanvas.nativeElement, {
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
