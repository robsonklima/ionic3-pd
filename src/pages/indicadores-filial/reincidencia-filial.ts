import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
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
  selector: 'reincidencia-filial-page',
  templateUrl: 'reincidencia-filial.html'
})
export class ReincidenciaFilialPage {
  slaFilial: SLAFilial;
  modo: string = "maiores";

  @ViewChild("reincidenciaMelhoresRegioesCanvas") reincidenciaMelhoresRegioesCanvas: ElementRef;
  reincidenciaMelhoresRegioesChart: Chart;
  reincidenciaMelhoresRegioesChartStatus: boolean = false;
  @ViewChild("reincidenciaMelhoresClientesCanvas") reincidenciaMelhoresClientesCanvas: ElementRef;
  reincidenciaMelhoresClientesChart: Chart;
  reincidenciaMelhoresClientesChartStatus: boolean = false;
  @ViewChild("reincidenciaMelhoresTecnicosCanvas") reincidenciaMelhoresTecnicosCanvas: ElementRef;
  reincidenciaMelhoresTecnicosChart: Chart;
  reincidenciaMelhoresTecnicosChartStatus: boolean = false;
  
  @ViewChild("reincidenciaPioresRegioesCanvas") reincidenciaPioresRegioesCanvas: ElementRef;
  reincidenciaPioresRegioesChart: Chart;
  reincidenciaPioresRegioesChartStatus: boolean = false;
  @ViewChild("reincidenciaPioresClientesCanvas") reincidenciaPioresClientesCanvas: ElementRef;
  reincidenciaPioresClientesChart: Chart;
  reincidenciaPioresClientesChartStatus: boolean = false;
  @ViewChild("reincidenciaPioresTecnicosCanvas") reincidenciaPioresTecnicosCanvas: ElementRef;
  reincidenciaPioresTecnicosChart: Chart;
  reincidenciaPioresTecnicosChartStatus: boolean = false;
  
  constructor(
    private navParams: NavParams,
    private reincidenciaRegiaoService: ReincidenciaRegiaoService,
    private reincidenciaTecnicoService: ReincidenciaTecnicoService,
    private reincidenciaClienteService: ReincidenciaClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    this.carregarDadosMelhores();
  }

  public carregarDadosMelhores() {
    this.reincidenciaRegiaoService.buscarReincidenciaMelhoresRegioes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaRegiao[]) => {
      this.reincidenciaMelhoresRegioesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeRegiao'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaMelhoresRegioesChart = new Chart(this.reincidenciaMelhoresRegioesCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    });  
    
    this.reincidenciaClienteService.buscarReincidenciaMelhoresClientes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaCliente[]) => {
      this.reincidenciaMelhoresClientesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeCliente'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaMelhoresClientesChart = new Chart(this.reincidenciaMelhoresClientesCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    }); 

    this.reincidenciaTecnicoService.buscarReincidenciaMelhoresTecnicos(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaTecnico[]) => {
      this.reincidenciaMelhoresTecnicosChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeTecnico'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaMelhoresTecnicosChart = new Chart(this.reincidenciaMelhoresTecnicosCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
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
    this.reincidenciaRegiaoService.buscarReincidenciaPioresRegioes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaRegiao[]) => {
      this.reincidenciaPioresRegioesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeRegiao'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaPioresRegioesChart = new Chart(this.reincidenciaPioresRegioesCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    });  
    
    this.reincidenciaClienteService.buscarReincidenciaPioresClientes(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaCliente[]) => {
      this.reincidenciaPioresClientesChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeCliente'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaPioresClientesChart = new Chart(this.reincidenciaPioresClientesCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
          },
          elements: {
            line: {
              fill: false
            }
          }
        }
      });
    }); 

    this.reincidenciaTecnicoService.buscarReincidenciaPioresTecnicos(this.slaFilial.codFilial).subscribe((reincidencias: ReincidenciaTecnico[]) => {
      this.reincidenciaPioresTecnicosChartStatus = true;

      let labels: string[] = reincidencias.map((i) => { return i['nomeTecnico'] });
      let values: number[] = reincidencias.map((i) => { return i['percentual'] });
      let metas: number[] = reincidencias.map(() => { return Config.CONSTANTS.METAS.REINCIDENCIA.M1 });
      let bgColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = reincidencias.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.reincidenciaPioresTecnicosChart = new Chart(this.reincidenciaPioresTecnicosCanvas.nativeElement, {
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
            xAxes: [{ ticks: { fontSize: 9, callback: function(n) { return n.substr(0, 5) }}}],
            yAxes: [{ ticks: { beginAtZero: true } }]
          },
          tooltips: {
            enabled: true,
            mode: 'label',
            callbacks: {
                title: function(tooltipItems, data) {
                    var idx = tooltipItems[0].index;
                    return data.labels[idx];
                }
            }
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
