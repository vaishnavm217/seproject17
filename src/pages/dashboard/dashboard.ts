import { Component } from '@angular/core';   //importing Component
import { IonicPage, NavController, NavParams } from 'ionic-angular';  //importing IonicPage, NavController, NavParams
import { Storage } from '@ionic/storage';  //importing Storage
import { DatePipe } from '@angular/common'; // importing Datapipe
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {AlmanacPage} from "../almanac/almanac";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * This is the dashboard of the Student App.
 * Timetable displays the timetable of the day.
 * Course Name provides the current course.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  timetable : any;
  course_name: string;
  course_id : Number;
  time_table_eve=[];
  num_lec : Number;
  course_time : Date;
  name : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public auth:AuthServiceProvider) {
    this.course_name="";
    this.course_time=null;
    this.course_id=-1;
    this.num_lec=0;
    this.storage.get("user").then((user)=>{this.name = user.first_name+" "+user.last_name});
    this.storage.get("timetable").then((val)=>{
      this.storage.get("courses").then((val1)=>{
        var temp=new Date();
          for(let i of val)
          {
              for(let j=0;j<Object.keys(val1).length;j++){
              if(i.Course_ID==val1[j].Course_ID && temp.getDay()==(i.T_days+8)%7)
              {
              i["Course_Name"] = val1[j].Course_Name;
              i.Start_time = new Date(temp.getFullYear(),temp.getMonth(),temp.getDate(),i.Start_time.split(":")[0],i.Start_time.split(":")[1],i.Start_time.split(":")[2])
              this.time_table_eve.push(i)
              }
              //console.log(val);
          }

          }

          var temp1 = {"Start_time":temp};

          var temp2=this.time_table_eve;
          temp2.push(temp1);
          temp2.sort(function(a,b){
            if (a.Start_time > b.Start_time) return 1;
            if (b.Start_time < a.Start_time) return -1;
          return 0;
          });
          temp2.sort();
          if(temp2.length!=1 && temp2.indexOf(temp1)!=temp2.length-1){
            this.course_name = temp2[temp2.indexOf(temp1)+1].Course_Name+" At ";
            this.course_time = temp2[temp2.indexOf(temp1)+1].Start_time;
            this.course_id = temp2[temp2.indexOf(temp1)+1].Course_ID;
            this.num_lec = temp2.length-1;
          }

        });
      });
  }

  openPage(){
    this.navCtrl.setRoot(AlmanacPage);
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad DashboardPage');
  }

}
