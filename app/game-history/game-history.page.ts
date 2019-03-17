import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyTablesService } from '../services/my-tables.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.page.html',
  styleUrls: ['./game-history.page.scss'],
})
export class GameHistoryPage implements OnInit {
  page_title: string = 'History of ';
  history: any = [];

  constructor(private activeRoute: ActivatedRoute, private tableService: MyTablesService) { 
    let game_id = this.activeRoute.snapshot.paramMap.get('id');
    this.tableService.getItem('games', game_id).then((d:any) => {
      this.page_title += d.name;
      this.tableService.getItems('history').then((h) => {
        this.history = this.tableService.getItemByField(h, 'game_id', d.id);
        for(let h of this.history) {
          h.result = JSON.parse(h.result);
          h.play_time = new Date(h.play_time).toLocaleString('vi-VN');
        }
      });
    });
  }

  ngOnInit() {
  }

}
