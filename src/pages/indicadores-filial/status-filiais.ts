import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, NavController, ActionSheetController } from 'ionic-angular';
import { SLAFilialService } from '../../services/sla-filial';
import { SLAFilial } from '../../models/sla-filial';
import { IndicadoresFilialMenuPage } from './indicadores-filial-menu';
import { Config } from '../../models/config';


@Component({
  selector: 'status-filiais-page',
  templateUrl: 'status-filiais.html'
})
export class StatusFiliaisPage {
  slaFiliais: SLAFilial[] = [];
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private slaFilialService: SLAFilialService
  ) {}

  ngOnInit() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
        this.slaFiliais = dados;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.navCtrl.pop().then(() => { this.exibirAlerta(Config.CONSTANTS.MENSAGENS.ERRO_OBTER_DADOS_SERVIDOR) }).catch();
      });
  }

  public carregarCor(nomeFilial: string): string {
    let slas: SLAFilial[] = this.slaFiliais.filter((s) => { return (s.nomeFilial == nomeFilial) });

    if (slas.length == 0) {
      return 'black';
    }
    
    if (slas[0].percentual < 92) {
      return 'red';
    } else if (slas[0].percentual >= 92 && slas[0].percentual < 95) {
      return 'orange';
    } else if (slas[0].percentual >= 95) {
      return 'green';
    }
  }

  public telaIndicadoresFilial(nomeFilial: string) {
    let slaFilial: SLAFilial[] = this.slaFiliais.filter((s) => { return (s.nomeFilial == nomeFilial) });    

    if (slaFilial.length > 0) {
      this.navCtrl.push(IndicadoresFilialMenuPage, { slaFilial: slaFilial[0] });
    }
  }

  public apresentarActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a Filial',
      buttons: [
        {
          text: 'FBU',
          handler: () => {
            this.telaIndicadoresFilial('FBU');
          }
        },{
          text: 'FCP',
          handler: () => {
            this.telaIndicadoresFilial('FCP');
          }
        },{
          text: 'FSP',
          handler: () => {
            this.telaIndicadoresFilial('FSP');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();
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