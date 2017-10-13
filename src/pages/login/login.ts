import { Component,Injectable } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController,
    ToastController,
    Events} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    login: {ph_number?: string, password?: string} = {};
    submitted = false;
    faculty = false;


  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public events: Events,
        public storage: Storage,
        public http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(form: NgForm)
  {
      this.submitted = true;

      if (form.valid)
      {
          let loading = this.loadingCtrl.create({
              content: "<div>Login wait...</div>",
          });
          //loading.present();
          console.log(this.login);
          let body = { 
              "username":this.login.ph_number,
              "password":this.login.password 
            };
          let headers = new Headers({
            'Content-Type' : 'charset=utf-8'
          });
          let options = new RequestOptions({ headers: headers});
          this.http.post("http://10.0.3.22:9092/api/validate_user/", body,options).subscribe(data=>{
              console.log(data);
          });
        //   if(this.login.ph_number=='dr.chs@iiits.in' && this.login.password=='dr.chs'){

        //   this.showToast("Welcome xyz!");
        //   this.storage.set('isLoggedIn',true);
        //   this.storage.set('faculty',true);
        //   this.faculty = true;
        //   //this.storage.set('userData',jsonResponse);
        //   this.navCtrl.setRoot(DashboardPage);
        //   //this.navCtrl.push(DashboardPage);
        //   }
      }
  }
  showToast(response_message:any)
    {
        let toast = this.toastCtrl.create({
            message: response_message,
            duration: 2200
        });
        toast.present();
    }

}
