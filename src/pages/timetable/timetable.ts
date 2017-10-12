import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

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
  coord : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.coord=[resp.coords.latitude,resp.coords.longitude,resp.coords.accuracy];
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetablePage');
  }

}
