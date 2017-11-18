import { Component,Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

/**
 * Generated class for the CoursedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html',
})

export class CoursedetailPage {

  course_id : any;
  course_details = {};
  course : any;
  students= [];
  temp_students = [];
  assignm =[]
  options: any;
  login: {file?: string}={};
  @Input() accept = 'image/*';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public storage: Storage, public http:Http,public iab:InAppBrowser,public loadingCtrl: LoadingController,public auth:AuthServiceProvider)
  {
  this.course="Structure";
  this.course_id=this.navParams.get("id");
  console.log(this.course_id);
  this.storage.get("user").then((user)=>{
    let headers = new Headers({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': 'JWT '+user.token
    });
    this.options = new RequestOptions({headers:headers})
  this.storage.get("courses").then((val)=>{

    let temp ={};
    console.log();
    for(let i=0;val[i]!=undefined;i++){
    if(val[i].Course_ID==this.course_id)
    {
      temp["Name"]=val[i].Course_Name;
      temp["desp"]=val[i].Course_description;
    }
  }
  this.course_details=temp;
  console.log("details",this.course_details);
  });
  this.http.get("https://iiitssmartattendance.herokuapp.com/api/add_view_assignments/",this.options)
  .map(res=>res.json())
  .subscribe((res)=>{
    for(let i of res)
    {
      if(i.Course_ID==this.course_id)
      {
      let temp=i;
      temp.End_Time = new Date(temp.End_Time);
      temp.Start_Time = new Date(temp.Start_Time);
      this.assignm.push(temp);
    }
    }
    console.log("assignment",this.assignm)
  });
  console.log("yey",this.course_id);
let body={
  course_id:this.course_id
};
  this.http.post("https://iiitssmartattendance.herokuapp.com/api/courses_rel_students/",body,this.options)
  .map(res=>res.json())
  .subscribe((res)=>{

    for(let i of Object.keys(res))
    {
      this.students.push({"Name":res[i].LDAP.first_name+" "+res[i].LDAP.last_name,"Num":""+res[i].Person_ID});
    }
    this.temp_students=this.students;
    console.log("lol",this.students);
    console.log(res);
  });
});
}

getItems(ev){
  this.temp_students = this.students;
  let val = ev.target.value;
  if (val && val.trim() != '') {
      this.temp_students = this.temp_students.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Num.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
    }
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursedetailPage');
  }
  openlink1(url){
    let temp = this.iab.create(url,'_blank');
    temp.on("exit").subscribe((eve)=>{
      this.navCtrl.pop();
      this.navCtrl.push("CoursedetailPage",{"id":this.course_id});
    })
  }


  openlink(url){
    let temp = this.iab.create(url,'_system');
  }


}
// @Component({
//   template:`<input type="file" accept="*/*" id="upload" />`
// }
// )
// class Profile {

//  constructor(params: NavParams) {
//    console.log('UserId', params.get('userId'));
//  }
// }
