import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StatusFiliaisPage } from '../indicadores-filial/status-filiais';
import { IndicadoresFiliaisPage } from '../indicadores-filial/indicadores-filiais';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public nav: NavController,
    private menu: MenuController
  ) {}

  public telaStatusFiliais() {
    this.menu.close().then(() => {
      this.nav.push(StatusFiliaisPage);  
    })
  }

  public telaIndicadoresFiliais() {
    this.menu.close().then(() => {
      this.nav.push(IndicadoresFiliaisPage);  
    })
  }

}
