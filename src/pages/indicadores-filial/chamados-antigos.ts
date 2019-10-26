import { Component} from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

import { Config } from '../../models/config';
import { ChamadoAntigo } from '../../models/chamado-antigo';
import { ChamadosAntigosService } from '../../services/chamados-antigos';
import { ChamadoConsultaPage } from '../chamados/chamado-consulta';


@Component({
  selector: 'chamados-antigos-page',
  templateUrl: 'chamados-antigos.html'
})
export class ChamadosAntigosPage {
  chamadosAntigos: ChamadoAntigo[] = [];
  
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private chamadosAntigosService: ChamadosAntigosService,
    private nav: NavController
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.chamadosAntigosService.buscarChamadosAntigos().subscribe((chamados: ChamadoAntigo[]) => {
        this.chamadosAntigos = chamados;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
  }

  public telaChamadoConsulta(codOS: number) {
    this.nav.push(ChamadoConsultaPage, { codOS: codOS });  
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
