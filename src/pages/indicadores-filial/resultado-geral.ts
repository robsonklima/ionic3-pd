import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';


@Component({
  selector: 'resultado-geral',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Resultado Geral</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      
    </ion-content>`
})
export class ResultadoGeralPage {
  
  constructor(
    public nav: NavController,
    private menu: MenuController
  ) {}

}
