import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { SLAFilialService } from '../../services/sla-filial';
import { SLAFilial } from '../../models/sla-filial';
import { IndicadoresFilialMenuPage } from './indicadores-filial-menu';



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
    private slaFilialService: SLAFilialService
  ) {
    document.querySelector('ion-content').scrollTo(100, 0);
  }

  ngOnInit() {
    

    const loader = this.loadingCtrl.create({
      content: "Obtendo dados do servidor..."
    });
    
    loader.present();

    this.slaFilialService.buscarSLAFiliais().subscribe((dados: SLAFilial[]) => {
        this.slaFiliais = dados;
        
        loader.dismiss();
      },
      err => {
        loader.dismiss();

        this.navCtrl.pop().then(() => { this.exibirAlerta('Erro ao obter os dados.') }).catch();
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

  private exibirAlerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: null,
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}