import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listData = [];
  taskName = '';
  complete = false;

  constructor(private dataService: DataService) {
    this.loadData();
  }

async loadData() {
  this.dataService.getData().subscribe(res => {
   this.listData = res;   
});
}

async addData() {
  if(/^(?!\s*$).+/.test(this.taskName)){
  await this.dataService.addData({name: this.taskName, complete: this.complete});
  this.taskName='';    
  this.loadData();
  } else {
    return;
  }
}

async checkBox(index, item) {   
  await this.dataService.checkBox(index, item);
  this.loadData();
}

async removeItem(index) {
  this.dataService.removeItem(index);
  this.listData.splice(index, 1);
}
}
