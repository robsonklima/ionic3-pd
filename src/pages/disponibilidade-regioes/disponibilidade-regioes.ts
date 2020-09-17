import { Component} from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Config } from '../../models/config';
import { DisponibilidadeRegiao } from '../../models/disponibilidade-regiao';
import { MultaRegiao } from '../../models/multa-regiao';
import { DisponibilidadeRegiaoService } from '../../services/disponibilidade-regiao';


@Component({
  selector: 'disponibilidade-regioes-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Disponibilidade BBTS</ion-title>
      </ion-navbar>

      <ion-toolbar no-border-top>
        <ion-segment [(ngModel)]="modo">
          <ion-segment-button value="disponibilidade">
            Disponibilidade
          </ion-segment-button>

          <ion-segment-button value="multas-regioes">
            Multas
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div [ngSwitch]="modo">
        <ion-list *ngSwitchCase="'disponibilidade'">
          <ion-card *ngFor="let d of disponibilidades; let i = index">
            <ion-item>
              <h2>Região <b>{{ d.regiao }}</b></h2>
            </ion-item>

            <img src="../../assets/imgs/{{ d.imagem }}.png">
          
            <ion-item class="ion-item-compact">
              <ion-icon name="analytics" item-start color="primary"></ion-icon>
              <h2>Disponibilidade</h2>
              <p>Média de Disponibilidade</p>
              <ion-note item-end>{{ d.mediaDisp }}%</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <ion-icon name="logo-buffer" item-start color="primary"></ion-icon>
              <h2>Abertas</h2>
              <p>Qtd OSs Abertas</p>
              <ion-note item-end>{{ d.qtdOSAbertas }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <ion-icon name="checkmark-circle" item-start color="primary"></ion-icon>
              <h2>Fechadas</h2>
              <p>Qtd OSs Fechadas</p>
              <ion-note item-end>{{ d.qtdOSFechadas }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <ion-icon name="copy" item-start color="primary"></ion-icon>
              <h2>Backlog</h2>
              <p>Qtd OSs Fechadas</p>
              <ion-note item-end>{{ d.backlogOS }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <ion-icon name="time" item-start color="primary"></ion-icon>
              <h2>Saldo</h2>
              <p>Saldo de Horas</p>
              <ion-note item-end>{{ d.saldoHoras }}</ion-note>
            </ion-item>
          </ion-card>
        </ion-list>

        <ion-list *ngSwitchCase="'multas-regioes'">
          <ion-card *ngFor="let m of multasRegioes; let i = index">
            <ion-item>
              <h2>Região <b>{{ m.regiao }}</b></h2>
            </ion-item>

            <ion-item class="ion-item-compact">
              <p>Disponibilidade 11</p>
              <ion-note item-end>R$ {{ m.criticidade11 }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <p>Disponibilidade 12</p>
              <ion-note item-end>R$ {{ m.criticidade12 }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <p>Disponibilidade 13</p>
              <ion-note item-end>R$ {{ m.criticidade13 }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <p>Disponibilidade 14</p>
              <ion-note item-end>R$ {{ m.criticidade14 }}</ion-note>
            </ion-item>

            <ion-item class="ion-item-compact">
              <p>Disponibilidade 15</p>
              <ion-note item-end>R$ {{ m.criticidade15 }}</ion-note>
            </ion-item>
          </ion-card>
        </ion-list>
      </div>
    </ion-content>`
})
export class DisponibilidadeRegioesPage {
  modo: string = "disponibilidade";
  disponibilidades: DisponibilidadeRegiao[] = [];
  multasRegioes: MultaRegiao[] = [];

  constructor(
    private disponibilidadeRegiaoService: DisponibilidadeRegiaoService,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create({ content: Config.CONSTANTS.MENSAGENS.OBTENDO_DADOS_SERVIDOR });
    loader.present();

    this.disponibilidadeRegiaoService.buscarDisponibilidadeRegioes()
      .subscribe((dados: DisponibilidadeRegiao[]) => {
        this.disponibilidades = dados;
        console.log(dados);

        loader.dismiss();
      }, 
      err => {
        loader.dismiss();
      });

    this.disponibilidadeRegiaoService.buscarMultasRegioes()
      .subscribe((dados: MultaRegiao[]) => {
        this.multasRegioes = dados;  
      }, 
      err => {
        
      });
  }
}
