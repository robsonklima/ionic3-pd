import { Component} from '@angular/core';
import { DisponibilidadeRegiao } from '../../models/disponibilidade-regiao';
import { DisponibilidadeRegiaoService } from '../../services/disponibilidade-regiao';


@Component({
  selector: 'disponibilidade-regioes-page',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Disponibilidade BBTS</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-card *ngFor="let d of disponibilidades; let i = index">

        <ion-item>
          <h2>Região <b>{{ d.regiao }}</b></h2>
        </ion-item>

        <img src="../../assets/imgs/{{ d.regiao }}.png">
      
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
    </ion-content>`
})
export class DisponibilidadeRegioesPage {
  disponibilidades: DisponibilidadeRegiao[] = [];

  constructor(
    private disponibilidadeRegiaoService: DisponibilidadeRegiaoService,
  ) {}

  ionViewWillEnter() {
    this.disponibilidadeRegiaoService.buscarDisponibilidadeRegioes()
      .subscribe((dados: DisponibilidadeRegiao[]) => {
        this.disponibilidades = dados;
      }, 
      err => {});
  }
}
