import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { IndicadoresFiliaisPage } from '../indicadores-filial/indicadores-filiais';
import { StatusFiliaisPage } from '../indicadores-filial/status-filiais';


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
