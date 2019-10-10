import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';


@Component({
  selector: 'chamados-antigos',
  template: `
    <ion-header>
      <ion-navbar no-border-bottom>
        <ion-title>Chamados Antigos</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      
    </ion-content>`
})
export class ChamadosAntigosPage {
  
  constructor(
    public nav: NavController,
    private menu: MenuController
  ) {}

}
