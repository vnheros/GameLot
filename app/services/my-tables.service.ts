import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class Game {
  public id: number;
  public name: string;
  public numbers: number;
  public min_number: number;
  public max_number: number;
  public created_time: Date;
  public deleted: boolean;
  public deleted_time: Date;
}

export class History {
  public id: number;
  public game_id: number;
  public play_time: Date;
  public result: string;
  public rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyTablesService {
  table = 'table_';
  seedkey = 'seed_table';
  items: any = [];
  seed = 0;

  constructor(private storage: Storage) { }

  private getKeyFormat(id) {
    return this.table + id;
  }

  private _addItem(item) {
    item.id = this.seed;
    this.storage.set(this.getKeyFormat(item.id), JSON.stringify(item));
    this.seed++;
    this.storage.set(this.seedkey, this.seed);
  }

  private setTable(table_name: string) {
    this.table = table_name + '_';
    this.seedkey = 'seed_' + table_name;
  }

  getItems(table_name: string) {
    this.setTable(table_name);
    this.items = [];
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((v, k, i) => {
        let a = this.table;
        if (k.indexOf(a) > -1) {
          this.items.push(JSON.parse(v));
        }
      }).then(() => {
        resolve(this.items);
      });
    });
    return promise;
  }

  addItem(table_name: string, item: any) {
    this.setTable(table_name);
    var promise = new Promise((resolve, reject) => {
      this.storage.get(this.seedkey).then((value) => {
        if (value) this.seed = value;
        else this.seed = 1;
        this._addItem(item);
        resolve(true);
      }, (error) => {
        this.seed = 1;
        this._addItem(item);
        resolve(true);
      });
    });
    return promise;
  }

  getItem(table_name: string, id: any) {
    this.setTable(table_name);
    var promise = new Promise((resolve, reject) => {
      this.storage.get(this.getKeyFormat(id)).then((value) => {
        resolve (JSON.parse(value));
      }, (error) => {
        reject (false);
      });
    });
    return promise;
  }

  setItem(table_name: string, id: any, field: string, value: any) {
    this.getItem(table_name, id).then((item) => {
      item[field] = value;
      if(field == 'deleted') item['deleted_time'] = new Date();
      this.storage.set(this.getKeyFormat(item['id']), JSON.stringify(item));
    });
  }

  getItemByField(data: any, field: string, value: string) {
    return data.filter(i => i[field] == value);
  }

  sortAscByField(field: string) {
    return function(a,b){
      if( a[field] > b[field]){
          return 1;
      }else if( a[field] < b[field] ){
          return -1;
      }
      return 0;
    }
  }

  sortDescByField(field: string) {
    return function(a,b){
      if( a[field] > b[field]){
          return -1;
      }else if( a[field] < b[field] ){
          return 1;
      }
      return 0;
    }
  }
}
