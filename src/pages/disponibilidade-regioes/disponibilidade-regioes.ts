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

        <img src="../../assets/imgs/card.png">
        <ion-fab right top>
          <button ion-fab>
            <ion-icon name="pin"></ion-icon>
          </button>
        </ion-fab>
      
        <ion-item>
          <ion-icon name="football" item-start large></ion-icon>
          <h2>{{ d.Regiao }}</h2>
          <p>11 N. Way St, Madison, WI 53703</p>
        </ion-item>
      
        <ion-item>
          <ion-icon name="wine" item-start large ></ion-icon>
          <h2>Institute of Fine Cocktails</h2>
          <p>14 S. Hop Avenue, Madison, WI 53703</p>
        </ion-item>
      
        <ion-item>
          <span item-start>18 min</span>
          <span item-start>(2.6 mi)</span>
          <button ion-button icon-start clear item-end>
            <ion-icon name="navigate"></ion-icon>
            Start
          </button>
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
