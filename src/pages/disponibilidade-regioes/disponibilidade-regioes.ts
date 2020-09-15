import { Component, ViewChild, ElementRef} from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';

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
      
    </ion-content>`
})
export class DisponibilidadeRegioesPage {
  constructor(
    private disponibilidadeRegiaoService: DisponibilidadeRegiaoService,
  ) {}

  ionViewWillEnter() {
    
  }
}
