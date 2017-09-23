import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  name="";
  faculty = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
      console.log(this.faculty);
    });
    if(this.faculty==true)
    {
      console.log(this.faculty);
      this.name="xyz";
    }
    else{
      this.name="xyz";
    }

  }

  ionViewDidLoad() {
    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
      console.log(this.faculty);
    });
    if(this.faculty==true)
    {
      console.log(this.faculty);
      this.name="xyz";
    }
    else{
      this.name="xyz";
    }
    console.log('ionViewDidLoad DashboardPage');
  }

}
