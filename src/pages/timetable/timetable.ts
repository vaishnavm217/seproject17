import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TimetablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {
  faculty = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetablePage');
  }

}
