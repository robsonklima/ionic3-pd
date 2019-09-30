import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { BarChartPage } from '../test/bar-chart';
import { DoughnutChartPage } from '../test/doughnut-chart';
import { LineChartPage } from '../test/line-chart';
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

  public telaMapaSvg() {
    this.menu.close().then(() => {
      this.nav.push(StatusFiliaisPage);  
    })
  }

  public telaBarChart() {
    this.menu.close().then(() => {
      this.nav.push(BarChartPage);  
    })
  }

  public telaDoughnutChart() {
    this.menu.close().then(() => {
      this.nav.push(DoughnutChartPage);  
    })
  }

  public telaLineChart() {
    this.menu.close().then(() => {
      this.nav.push(LineChartPage);  
    })
  }
}
