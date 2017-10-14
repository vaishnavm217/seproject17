import { Component,Injectable } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController,
    ToastController,
    Events,
    AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
    passsubmitted = false;
    login_stat = false;
    roles: any;
    course: any;
    dept: any;
    caleve : any;
    roles_dict ={};
    usersubmitted = false;
  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public events: Events,
        public storage: Storage,
        public http: Http,
        public alertCtrl:AlertController) {
            this.storage.get("timetable").then((val)=>{
                if(val==null)
                {
                    this.http.get("http://10.0.3.22:8000/api/add_view_timetable/").map(res=>res.json()).subscribe((jsonresp)=>{
                        //console.log(jsonresp,"data is empty");
                        this.roles = jsonresp;
                        this.storage.set("timetable",jsonresp);
                        console.log("data stored");
                    });
                }
            });
            this.storage.get("roles_dict").then((val) => {
                this.roles_dict = val;
                console.log(val);
                if(val==null)
                {
                this.storage.get("roles").then((val) => {
                    this.roles = val;
                    console.log("data loaded",this.roles);
                    if(this.roles==null)
                    {
                        this.http.get("http://10.0.3.22:8000/api/add_view_roles/").map(res=>res.json()).subscribe((jsonresp)=>{
                            //console.log(jsonresp,"data is empty");
                            this.roles = jsonresp;
                             this.storage.set("roles",jsonresp);
                            console.log("data stored");
                        });
                    }
                    let temp_dic = {};
                    for(let i =0;i<this.roles.length;i++)
                    {
                        temp_dic[this.roles[i].Role_ID.toString()] = this.roles[i].Role_name;
                    }
                    this.storage.set("roles_dict",temp_dic);
                    this.roles_dict = temp_dic;
            });}
        });
            this.storage.get("course").then((val) => {
                this.course = val;
                console.log("data loaded",this.course);
                if(this.course==null)
                {
                    this.http.get("http://10.0.3.22:8000/api/add_view_courses/").map(res=>res.json()).subscribe((jsonresp)=>{
                        //console.log(jsonresp,"data is empty");
                        this.course = jsonresp;
                        this.storage.set("course",jsonresp);
                        console.log("data stored");
                    });
                }
            });
            this.storage.get("dept").then((val) => {
                this.dept = val;
                console.log("data loaded",this.dept);
                if(this.dept==null)
                {
                    this.http.get("http://10.0.3.22:8000/api/departments/").map(res=>res.json()).subscribe((jsonresp)=>{
                        //console.log(jsonresp,"data is empty");
                        this.dept = jsonresp;
                        this.storage.set("dept",jsonresp);
                        console.log("data stored");
                    });
                }
            });
            this.storage.get("caleve").then((val) => {
                this.caleve = val;
                console.log("data loaded",this.caleve);
                if(this.caleve==null)
                {
                    this.http.get("http://10.0.3.22:8000/api/add_view_events/").map(res=>res.json()).subscribe((jsonresp)=>{
                        //console.log(jsonresp,"data is empty");
                        this.caleve = jsonresp;
                        this.storage.set("caleve",jsonresp);
                        console.log("data stored");
                    });
                }
            });
            this.storage.get("login_stat").then((val) => {
                this.login_stat = val;
                console.log("data loaded",this.login_stat);
                if(this.login_stat)
                {
                    this.storage.get("user").then((val) => {
                    this.showToast("Welcome back! "+val.first_name+" "+val.last_name);
                });
                    this.navCtrl.setRoot(DashboardPage);
                }
            });
            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(form: NgForm)
  {
      this.usersubmitted = true;
      this.passsubmitted = true;
      let errorr :any;
      if (form.valid)
      {
        this.usersubmitted = false;
        this.passsubmitted = false;
          let loading = this.loadingCtrl.create({
              content: "<div>Logging in</div>",
          });
          console.log(this.login);
          let body = { 
              json_data:{username:this.login.ph_number,password:this.login.password}
            };
          let headers = new Headers({
            'Content-Type' : 'application/json',
          });
          loading.present();
          let options = new RequestOptions({ headers: headers});
        this.http.post("http://10.0.3.22:8000/api/validate_user/",body,options).map(res => res.json()).subscribe((jsonres)=>{
        console.log(jsonres );
        
        this.http.get("http://10.0.3.22:8000/api/personnel/"+jsonres.id+"/").map(res=>res.json()).subscribe((jsonresp)=>{
        
              if(this.roles_dict[jsonresp.Role]=="Faculty")
              {
                loading.setContent("Success!");
                loading.dismiss();
                this.login_stat = true;
                this.storage.set("login_stat",this.login_stat)
                this.storage.set("user",jsonres);
                this.storage.set("personal",jsonresp);
                this.showToast("Welcome! "+jsonres.first_name+" "+jsonres.last_name);
                this.navCtrl.setRoot(DashboardPage);
              }
              else{
                loading.dismiss();
                const alert = this.alertCtrl.create({
                    title: 'Unauthorized Login',
                    subTitle: 'Please login using student app',
                    buttons: ['Dismiss']
                  });
                  alert.present();
              }
    },(error)=>{
            loading.dismiss();
            
            console.log(error);
        });
        },(error)=>{
            loading.dismiss();
            const alert = this.alertCtrl.create({
                title: 'Login Failed',
                subTitle: 'Please Check your Credentials',
                buttons: ['Dismiss']
              });
              alert.present();
            console.log(error);
        });
      }
      else {
          if(this.login.ph_number)
          {
            this.usersubmitted = false;
          }
          if(this.login.password)
          {
            this.passsubmitted = false;
          }
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
