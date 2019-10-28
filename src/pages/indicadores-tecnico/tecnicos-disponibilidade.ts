import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { Disponibilidade } from '../../models/disponibilidade';
import { TecnicoDisponibilidade } from '../../models/tecnico-disponibilidade';
import { TecnicoDisponibilidadeService } from '../../services/tecnico-disponibilidade';


@Component({
  selector: 'tecnicos-disponibilidade-page',
  templateUrl: 'tecnicos-disponibilidade.html'
})
export class TecnicosDisponibilidadePage {
  disponibilidades: Disponibilidade[] = [];
  tecnicosDisponibilidades: TecnicoDisponibilidade[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private tecnicoDisponibilidade: TecnicoDisponibilidadeService
  ) { }

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.tecnicoDisponibilidade.buscarTecnicoDisponibilidade().subscribe((dados: TecnicoDisponibilidade[]) => {
      this.tecnicosDisponibilidades = dados;

      let dFiliais: TecnicoDisponibilidade[] = this.tecnicosDisponibilidades.filter((filial, index, self) =>
        index === self.findIndex((aux) => (aux.nomeFilial === filial.nomeFilial && aux.nomeFilial === filial.nomeFilial))
      );

      let filiais = dFiliais.map((i) => { return i['nomeFilial'] }).sort();

      filiais.forEach((d) => {
        let disp = new Disponibilidade();
        disp.nomeFilial = d;
        disp.qtdTecnicosComChamadosTransferidos = this.buscarQtdTecnicosAtivosComChamadosTransferidos(d);
        disp.qtdTecnicosSemChamadosTransferidos = this.buscarQtdTecnicosSemChamadosTransferidos(d);
        disp.qtdTecnicosInativos = this.buscarQtdTecnicosInativos(d);
        disp.qtdTecnicos = this.buscarQtdTecnicos(d);
        this.disponibilidades.push(disp);
      });

      loader.dismiss();
    },
    err => {
      loader.dismiss();
      this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) });
    });
  }

  private buscarQtdTecnicosAtivosComChamadosTransferidos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && d.qtdChamadosTransferidos > 0 && (!d.indFerias && d.indTecnicoAtivo)) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicosSemChamadosTransferidos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && !d.qtdChamadosTransferidos && (!d.indFerias && d.indTecnicoAtivo)) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicosInativos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial && (d.indFerias || !d.indTecnicoAtivo)) {
        s++;
      }
    });

    return s;
  }

  private buscarQtdTecnicos(nomeFilial: string): number {
    let s = 0;

    this.tecnicosDisponibilidades.forEach((d) => {
      if (d.nomeFilial == nomeFilial) {
        s++;
      }
    });

    return s;
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
