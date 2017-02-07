import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Case} from "../../providers/case";


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private caseTicket: Case) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    //// Let's populate this page with some filler content for funzies
    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];
    //
    //this.items = [];
    //for (let i = 1; i < 11; i++) {
    //  this.items.push({
    //    title: 'Item ' + i,
    //    note: 'This is item #' + i,
    //    icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //  });
    //}

    this.loadCases()
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }

  loadCases(){
    this.caseTicket.load()
        .then(data => {
          this.items = data;
        });
  }
}
