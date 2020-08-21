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
  templateUrl: 'sla-filial.html'
})
export class SLAFilialPage {
  slaFilial: SLAFilial;
  modo: string = "maiores";
  
  @ViewChild("slaPioresRegioesCanvas") slaPioresRegioesCanvas: ElementRef;
  slaPioresRegioesChart: Chart;
  slaPioresRegioesStatus: boolean = false;
  @ViewChild("slaPioresClientesCanvas") slaPioresClientesCanvas: ElementRef;
  slaPioresClientesChart: Chart;
  slaPioresClientesStatus: boolean = false;
  @ViewChild("slaPioresTecnicosCanvas") slaPioresTecnicosCanvas: ElementRef;
  slaPioresTecnicosChart: Chart;
  slaPioresTecnicosStatus: boolean = false;

  @ViewChild("slaMelhoresRegioesCanvas") slaMelhoresRegioesCanvas: ElementRef;
  slaMelhoresRegioesChart: Chart;
  slaMelhoresRegioesStatus: boolean = false;
  @ViewChild("slaMelhoresClientesCanvas") slaMelhoresClientesCanvas: ElementRef;
  slaMelhoresClientesChart: Chart;
  slaMelhoresClientesStatus: boolean = false;
  @ViewChild("slaMelhoresTecnicosCanvas") slaMelhoresTecnicosCanvas: ElementRef;
  slaMelhoresTecnicosChart: Chart;
  slaMelhoresTecnicosStatus: boolean = false;
  
  constructor(
    private navParams: NavParams,
    private slaRegiaoService: SLARegiaoService,
    private slaTecnicoService: SLATecnicoService,
    private slaClienteService: SLAClienteService
  ) {
    this.slaFilial = this.navParams.get('slaFilial');
  }

  ngOnInit() {
    this.carregarDadosMelhores();
  }

  public carregarDadosPiores() {
    this.slaRegiaoService.buscarSLAPioresRegioes(this.slaFilial.codFilial).subscribe((slas: SLARegiao[]) => {
      this.slaPioresRegioesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeRegiao'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.slaPioresRegioesChart = new Chart(this.slaPioresRegioesCanvas.nativeElement, {
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

    this.slaClienteService.buscarSLAPioresClientes(this.slaFilial.codFilial).subscribe((slas: SLACliente[]) => {
      this.slaPioresClientesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeCliente'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.slaPioresClientesChart = new Chart(this.slaPioresClientesCanvas.nativeElement, {
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

    this.slaTecnicoService.buscarSLAPioresTecnicos(this.slaFilial.codFilial).subscribe((slas: SLATecnico[]) => {
      this.slaPioresTecnicosStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeTecnico'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.slaPioresTecnicosChart = new Chart(this.slaPioresTecnicosCanvas.nativeElement, {
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

  public carregarDadosMelhores() {
    this.slaRegiaoService.buscarSLAMelhoresRegioes(this.slaFilial.codFilial).subscribe((slas: SLARegiao[]) => {
      this.slaMelhoresRegioesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeRegiao'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });
        
      this.slaMelhoresRegioesChart = new Chart(this.slaMelhoresRegioesCanvas.nativeElement, {
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

    this.slaClienteService.buscarSLAMelhoresClientes(this.slaFilial.codFilial).subscribe((slas: SLACliente[]) => {
      this.slaMelhoresClientesStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeCliente'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERDE });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.slaMelhoresClientesChart = new Chart(this.slaMelhoresClientesCanvas.nativeElement, {
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

    this.slaTecnicoService.buscarSLAMelhoresTecnicos(this.slaFilial.codFilial).subscribe((slas: SLATecnico[]) => {
      this.slaMelhoresTecnicosStatus = true;
      let labels: string[] = slas.map((i) => { return i['nomeTecnico'] });
      let values: number[] = slas.map((i) => { return i['percentual'] });
      let metas: number[] = slas.map(() => { return Config.CONSTANTS.METAS.SLA.M1 });
      let bgColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.AZUL });
      let metaColors: string[] = slas.map(() => { return Config.CONSTANTS.CORES.RGB.VERMELHO_ESCURO });

      this.slaMelhoresTecnicosChart = new Chart(this.slaMelhoresTecnicosCanvas.nativeElement, {
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
