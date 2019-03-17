import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { History,  MyTablesService } from '../services/my-tables.service';
import { delay } from 'q';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.page.html',
  styleUrls: ['./play-game.page.scss'],
})
export class PlayGamePage implements OnInit {
  game: any;
  numbers: any = [];
  history: History;
  curTime: any;
  played: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute, 
    private tableService: MyTablesService) {
      this.curTime = new Date().toLocaleString('vi-VN');
      this.history = new History();
      let game_id = this.activeRoute.snapshot.paramMap.get('id');
      this.tableService.getItem('games', game_id).then((d) => {
        this.game = d;
        for(let i=0; i < this.game.numbers; i++) {
          this.numbers.push(-1);
        }
      });
  }

  ngOnInit() {
  }
  
  //delay(ms: number) {
  //  return new Promise( resolve => setTimeout(resolve, ms) );
  //}

  async startGame() {
    for(let i = 1; i < 3; i++) {
      for(let j = this.game.min_number; j <=  this.game.max_number; j++) {
        for(let k=0; k < this.game.numbers; k++) {
          this.numbers[k] = j;
        }
        await delay(200);
      }
    }
    
    for(let i=0; i < this.game.numbers; i++) {
      this.numbers[i] = Math.floor(Math.random() * this.game.max_number) + this.game.min_number;
    }

    this.saveHistory();
    this.played = true;
  }

  saveHistory() {
    this.history.play_time = new Date();
    this.history.game_id = this.game.id;
    this.history.result = JSON.stringify(this.numbers);
    this.tableService.addItem('history', this.history);
  }
}
