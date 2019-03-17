import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MyTablesService } from '../services/my-tables.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  games: any = [];
  history: any = [];

  constructor(
    private auth: AuthService,
    private tableService: MyTablesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.auth.loggedin().then(isLoggedin => {
      if (!isLoggedin) {
        this.navCtrl.goRoot('/login');
      }
    });
  }

  ionViewWillEnter() {
    this.loadGames();
  }

  loadGames() {
    this.tableService.getItems('games').then((d) => {
      this.games = d;
      this.tableService.getItems('history').then((h) => {
        this.history = h;
        for(let game of this.games) {
          let gh = this.tableService.getItemByField(this.history, 'game_id', game.id);
          if(gh.length > 0) {
            gh.sort(this.tableService.sortDescByField('play_time'));
            game.last_play_time = new Date(gh[0].play_time).toLocaleString('vi-VN');
            game.last_result = JSON.parse(gh[0].result);
          }
        }
      });
    });
  }

  newGame() {
    this.navCtrl.goForward('/new-game');
  }

  playGame(game_id) {
    this.navCtrl.goForward(`/play-game/${game_id}`);
  }

  async deleteGame(game_id) {
    let alert = await this.alertCtrl.create({
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: 'Do you want to delete this game?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            //console.log('OK clicked' + game_id);
            this.tableService.setItem('games', game_id, 'deleted', true);
          }
        }
      ]
    });
    await alert.present();
  }
}
