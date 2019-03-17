import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  loading: any;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.auth.loggedin().then(isLoggedin => {
      if (isLoggedin) {
        this.auth.setAuth();
        this.navCtrl.goRoot('/home');
      }
    });
  }

  async login() {
    await this.showLoader();
    let credentials = {
      username: this.username,
      password: this.password
    };
    this.auth.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log("OK: " + result);
      this.navCtrl.goRoot('/home');
    }, (err) => {
      this.loading.dismiss();
      console.log("ERROR: " + err);
    });
  }

  launchSignup() {
    this.navCtrl.goForward('/signup');
  }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    return await this.loading.present();
  }

}
