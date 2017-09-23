import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  faculty = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }

}
