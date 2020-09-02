import { Component, ViewChild, ElementRef} from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { SLAFilial } from '../../models/sla-filial';
import { SLAFilialService } from '../../services/sla-filial';
import { Chart } from "chart.js";
import { SPAFilialService } from '../../services/spa-filial';
import { SPAFilial } from '../../models/spa-filial';


@Component({
  selector: 'indicadores-filiais-page',
  templateUrl: 'indicadores-filiais.html'
})
export class IndicadoresFiliaisPage {
  modo: string = "sla";
  sla: SLAFilial[] = [];
  pendencia: SLAFilial[] = [];
  reincidencia: SLAFilial[] = [];

  @ViewChild("barCanvas") barCanvas: ElementRef;
  public barChart: Chart;

  metaSLA1: number = Config.CONSTANTS.METAS.SLA.M1;
  metaSLA2: number = Config.CONSTANTS.METAS.SLA.M2;
  metaReincidencia1: number = Config.CONSTANTS.METAS.REINCIDENCIA.M1;
  metaReincidencia2: number = Config.CONSTANTS.METAS.REINCIDENCIA.M2;
  metaPendencia1: number = Config.CONSTANTS.METAS.PENDENCIA.M1;
  metaPendencia2: number = Config.CONSTANTS.METAS.PENDENCIA.M2;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private slaFilialService: SLAFilialService,
    private spaFilialService: SPAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
      console.log(dados);
      

      this.sla = dados.sort(function(a, b) { 
        return ((a.percentual > b.percentual) ? -1 : ((a.percentual < b.percentual) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.pendencia = dados.sort(function(a, b) { 
        return ((a.pendencia < b.pendencia) ? -1 : ((a.pendencia > b.pendencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      this.reincidencia = dados.sort(function(a, b) { 
        return ((a.reincidencia < b.reincidencia) ? -1 : ((a.reincidencia > b.reincidencia) ? 1 : 0));
      }).filter(function(a) { return a.nomeFilial !== 'TOTAL' });

      loader.dismiss();
    },
    err => {
      loader.dismiss()

      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
    });
  }

  private carregarGraficoSPA(labels: string[], data: number[], colors: string[], metas: number[]) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "%",
            data: data,
            backgroundColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  onSegmentChanged($event) {
    if ($event.value == 'spa') {
      const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
      loader.present();

      this.spaFilialService.buscarSPAFilial().subscribe((spas: SPAFilial[]) => {
        let labels: string[] = []
        let data: number[] = []
        let colors: string[] = []
        let metas: number[] = []
  
        spas
          .sort(function(a, b) { return b.percentual - a.percentual })
          .forEach(p => {
            if (p.nomeFilial.length <= 12)
              labels.push(p.nomeFilial);
            else
              labels.push(p.nomeFilial.substring(0, 12));
            
            data.push(p.percentual);
  
            if (p.percentual >= Config.CONSTANTS.METAS.SPA.M1) {
              colors.push(Config.CONSTANTS.CORES.RGB.VERDE);
            } else {
              colors.push(Config.CONSTANTS.CORES.RGB.VERMELHO);
            }
  
            metas.push(Config.CONSTANTS.METAS.SPA.M1);
        });
  
        this.carregarGraficoSPA(labels, data, colors, metas);
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
    }
  }

  private exibirAlerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: null,
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}
