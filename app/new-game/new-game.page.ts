import { Component, OnInit } from '@angular/core';
import { Game,  MyTablesService } from '../services/my-tables.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {
  game: Game;

  constructor(private gameService: MyTablesService, private navCtrl: NavController) {
    this.game = new Game();
    this.game.numbers = 5; //default value
  }

  ngOnInit() {
  }

  save() {
    this.game.created_time = new Date();
    this.gameService.addItem('games', this.game).then((v) => {
      if(v) this.navCtrl.goRoot('/home');
    });
  }
}
