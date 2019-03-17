import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MyTablesService } from '../services/my-tables.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  games: any = [];
  history: any = [];
  items: any = [];
  keywords: string = '';
  showSearchBar: boolean = true;

  constructor(
    private auth: AuthService,
    private tableService: MyTablesService,
    private navCtrl: NavController) { }

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
        this.items = d;
        this.tableService.getItems('history').then((h) => {
          this.history = h;
          for(let game of this.games) {
            let gh = this.tableService.getItemByField(this.history, 'game_id', game.id);
            game.pcount = gh.length;
          }
        });
      });
    }

    searchGames() {
      this.items = this.games.filter((item) => {
        return item.name.toLowerCase().indexOf(this.keywords.toLowerCase()) > -1;
      });
    }

    toggleSarchBar() {
      this.showSearchBar = !this.showSearchBar;
    }

    showGameHistory(game_id) {
      this.navCtrl.goForward(`/game-history/${game_id}`);
    }
}
