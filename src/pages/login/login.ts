import { Component } from '@angular/core';
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
        public storage: Storage) {
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
              duration: 1000
          });
          loading.present();
          if(this.login.ph_number=='dr.chs@iiits.in' && this.login.password=='dr.chs'){
          this.showToast("Welcome xyz!");
          this.storage.set('isLoggedIn',true);
          this.storage.set('faculty',true);
          this.faculty = true;
          //this.storage.set('userData',jsonResponse);
          this.navCtrl.setRoot(DashboardPage);
          //this.navCtrl.push(DashboardPage);
          }
          if(this.login.ph_number=='rajat.s15@iiits.in' && this.login.password=='rajat'){
          this.showToast("Welcome xyz!");
          this.storage.set('isLoggedIn',true);
          this.storage.set('faculty',false);
          this.faculty = false;
          //this.storage.set('userData',jsonResponse);
          this.navCtrl.setRoot(DashboardPage);
          //this.navCtrl.push(DashboardPage);
          }
        /*  this.authService.logIn(this.login).subscribe((jsonResponse) => {

              loading.dismiss();
              if(jsonResponse.op_status==Constants.LOGIN_SUCCESS)
              {
                  this.showToast("Welcome!");
                  this.storage.set('isLoggedIn',true);
                  this.storage.set('userData',jsonResponse);
                  this.navCtrl.setRoot(MainPage);
                  this.navCtrl.push(MainPage);
              }

              else if(jsonResponse.op_status==Constants.UNKNOWN_SERVER_ERROR)
              {
                  this.showToast("Server Error!");
              }

              else if(jsonResponse.op_status==Constants.WRONG_USERNAME_PASSWORD)
              {
                  this.showToast("Invalid Credentials! Try Again");
              }
          });
          */
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
