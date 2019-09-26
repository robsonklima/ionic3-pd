import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, MenuController, 
         ToastController, AlertController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { HomePage } from '../home/home';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  
  nomeApp: string; 
  versaoApp: string;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    
    private toastCtrl: ToastController,
    private events: Events,
    
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  public login(form: NgForm) {
    // const loading = this.loadingCtrl.create({ 
    //   content: 'Autenticando...' 
    // });
    // loading.present();

    // let usuario = new Usuario();
    // usuario.codUsuario = form.value.codUsuario;
    // usuario.senha = form.value.senha;

    // let login = new Login();
    // login.usuario = usuario;
    // login.versaoAplicativo = this.versaoApp;

    // this.usuarioService.login(login).subscribe((login) => {
    //   if(login && !login.erro) {
    //     loading.dismiss().then(() => {
    //       this.usuario = login.usuario;
    //       this.salvarDadosGlobais();
    //       this.usuarioService.salvarCredenciais(this.usuario);
    //       this.events.publish('login:efetuado', this.dadosGlobais);
             this.menuCtrl.enable(true);
             this.navCtrl.setRoot(HomePage);
    //     });
    //   } else {
    //     loading.dismiss().then(() => {
    //       this.exibirAlerta(login.mensagem);
    //     });
    //   }
    // },
    // err => {
    //   loading.dismiss().then(() => {
    //     this.exibirToast(err);
    //   });
    // });
  }
 
  public exibirToast(message: string): Promise<any> {    
    return new Promise((resolve, reject) => {
      const toast = this.toastCtrl.create({
        message: message, duration: 2000, position: 'bottom'
      });

      resolve(toast.present());
    });
  }

  private exibirAlerta(msg: string) {
    const alerta = this.alertCtrl.create({
      title: 'Alerta!',
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}