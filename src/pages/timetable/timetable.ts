import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

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
  course_id = 1;
  course = "IR";
  secret_key : any;
  coord : any;
  flag = true;
  sub: any;
  times = 0;
  studs ={};
  inter : any;
  atten_id : any;
  stud_arr=[];
  mess : string;
  roll_count = 0;
  stat = "Start Attendance";
  main_url: string;
  time_table_eve=[];
  headers : any;
  started_class: Boolean;
  yo = true;
  name_arr : any;
  show_stu : boolean;
  tid: any;
  show_final_button: boolean;
  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public geolocation: Geolocation,public loadingCtrl: LoadingController, public http: Http,public auth:AuthServiceProvider) {
    this.app.viewWillLeave.subscribe((event)=>{
      console.log("left page",event.component.name);
      if(event.id=="TimetablePage")
      {
        clearInterval(this.inter);
      }
    })
    this.show_final_button=false;
    this.show_stu=false;
  this.course_id=7;
  this.main_url="https://iiitssmartattendance.herokuapp.com";
    this.storage.get("user").then((val2)=>{
    this.storage.get("timetable").catch().then((val)=>
    {
      this.storage.get("courses").catch().then((val1)=>
      {
          var temp=new Date();
            for(let i of val)
            {
                for(let j=0;j<Object.keys(val1).length;j++)
                {
                  if(i.Course_ID==val1[j].Course_ID && temp.getDay()==(i.T_days+8)%7)
                  {
                    i["Course_Name"] = val1[j].Course_Name;
                    i.Start_time = new Date(temp.getFullYear(),temp.getMonth(),temp.getDate(),i.Start_time.split(":")[0],i.Start_time.split(":")[1],i.Start_time.split(":")[2])
                    i.End_time = new Date(temp.getFullYear(),temp.getMonth(),temp.getDate(),i.End_time.split(":")[0],i.End_time.split(":")[1],i.End_time.split(":")[2])
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

            if(temp2.length!=1 && temp2.indexOf(temp1)!=0)
            {
                // this.course_name = temp2[temp2.indexOf(temp1)+1].Course_Name+" At ";
                // this.course_time = temp2[temp2.indexOf(temp1)+1].Start_time;
                // this.course_id = temp2[temp2.indexOf(temp1)+1].Course_ID;
                // this.num_lec = temp2.length-1;
                if(temp2[temp2.indexOf(temp1)-1].Start_time<=temp1.Start_time<=temp2[temp2.indexOf(temp1)-1].End_time)
                {
                  let pos = temp2.indexOf(temp1)-1
                  this.started_class=true;
                  this.tid= temp2[pos].T_ID;
                  this.course_id =temp2[pos].Course_ID;
                  this.course = temp2[pos].Course_Name;
                }
                else
                {
                  this.started_class=false;
                  this.course_id=-1;
                  this.mess = "Class Not Started";
                }

            }
            else
            {
              this.started_class=false;
              this.course_id=7;
              this.mess = "Class Not Started";
            }
            console.log(temp2,this.started_class,this.course_id);
            if(this.started_class)
            {
                  this.headers = new Headers({
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Authorization' : 'JWT '+val2.token
                  });
                  let options = new RequestOptions({ headers: this.headers});
                  let body={
                    course_id:this.course_id

                  }
                  this.http.post(this.main_url+"/api/courses_rel_students/",body,options).map(res=>res.json()).subscribe((jsonresp)=>{
                      // for(let i =0;i<jsonresp.length;i++)
                      // {
                      //   if(jsonresp[i].Course_ID==this.course_id)
                      //   {
                            //this.stud_arr = Object.keys(jsonresp);
                            this.name_arr = jsonresp;
                            for(let i in this.name_arr)
                            {
                              this.name_arr[i].checked=false;
                            }
                            console.log("list!oooooooooo",this.name_arr);
                      //   }
                      // }
                  });
            }
      });
    });
  });
}
  refress()
  {
    console.log("**************refress called*******************");
    if(!this.times){
      this.times=1;
      console.log("refress1");
    this.sub=this.geolocation.watchPosition({enableHighAccuracy:true}).catch(this.handleError)
      .subscribe((position)=> {
        if(position.coords==undefined)
          position={coords:{accuracy:30,latitude:89,longitude:90}};
        console.log("Subs went!");
       console.log(position);
    if(position.coords.accuracy<=300 && this.flag)
    {
      this.secret_key = parseInt(1000+Math.random()*8999+"");
      this.stat = "Stop Attendance";
      let loc = position.coords.longitude+";"+position.coords.latitude+";"+this.secret_key;
      this.mess="The secret key is :"+this.secret_key;
      this.flag=false;
      let body ={
        Course_Slot:this.tid,Date_time:new Date(),Status:1,Location:loc
      };
      console.log(loc);
      // loading.present();
      let options = new RequestOptions({ headers: this.headers});
      console.log("Main Options",options)
      this.http.post(this.main_url+'/api/add_view_attendance_sessions/',body,options).map(res=>res.json()).subscribe((jsonresp)=>
      {console.log("success!");
      // this.http.get(this.main_url+"/api/add_view_attendance_sessions/",options).map(res=>res.json()).subscribe((jsonresp)=>{
     // this.mess+="<br>Lecture id:"+this.atten_id;
      this.atten_id = jsonresp.Session_ID;
        console.log("attend",this.atten_id);
        this.mess+="\nLecture id:"+this.atten_id;
  this.inter = setInterval(()=>{this.refreshfn()},1000);
        let y = {"interval":this.inter,"lec_id":this.atten_id,"secret_key":this.secret_key}
        this.storage.set("atten",true);

      this.sub.unsubscribe();
    },(err)=>{console.log("Failed!");});
    }

  },(error)=>{
    this.mess="Error in geolocation";
  });
}
else{
  clearInterval(this.inter);
  console.log("timer cleared");
  this.mess = "Attendance Stopped";
  this.show_final_button=true;
}
    // this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
    //   loading.setContent("Success!");
    //   console.log(resp);
    //   loading.dismiss();
    //   this.coord=[resp.coords.latitude,resp.coords.longitude,resp.coords.accuracy];
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //    loading.setContent("Failed!");
    //    loading.dismiss();
    //  });
  }
  confirmfn()
  {
      let options = new RequestOptions({ headers: this.headers});
      this.show_final_button=false;
      this.show_stu=false;
      this.stat = "Attendance Done!";
      let absentees = []
      for(let i in this.name_arr)
      {
        if(this.name_arr[i].checked)
          this.stud_arr.push(this.name_arr[i].Person_ID)
        else
          absentees.push(this.name_arr[i].Person_ID)
      }
      console.log(absentees,this.stud_arr);
      let body ={
        id:this.atten_id,data_present:this.stud_arr,data_absent:absentees
      };
      this.http.post(this.main_url+'/api/change_stat/',body,options).map(res=>res.json()).subscribe((jsonresp)=>{
        console.log(jsonresp);
      });
  }
  true_total(){
    let temp=0;
    for(let i in this.name_arr)
    {
      if(this.name_arr[i].checked)
        temp+=1
    }
    this.roll_count=temp;
  }
  refreshfn(){
    console.log("Hello");
    let options = new RequestOptions({ headers: this.headers});
    this.http.post(this.main_url+"/api/student_session/",{sess:this.atten_id},options).map(res=>res.json()).subscribe((jsonresp)=>{
    // console.log("found resp",jsonresp);
    for(let i=0;i<jsonresp.length;i++)
      {
          // if(this.name_arrjsonresp[i].Student_ID])
          // {
          //   this.studs[jsonresp[i].Student_ID] = "Present";
          //   this.roll_count+=1;
          // }
          for(let j in this.name_arr)
          {
            // console.log("server:",jsonresp[i].Student_ID,"ionic:",this.name_arr[j],this.name_arr[j]["Student_ID"]==jsonresp[i].Student_ID)
            if(this.name_arr[j].Person_ID==jsonresp[i].Student_ID && !this.name_arr[j].checked)
            {
              this.name_arr[j].checked = true;
              // console.log("marked")
            }
          }
      }
      // console.log("name_arr",this.name_arr);
    });
    // console.log("things",this.stud_arr);
    if(this.name_arr.length==this.roll_count){
    clearInterval(this.inter);
    console.log("timer cleared");
    this.mess="Attendance Done!";
  }

  }
  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    let earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2-lat1);
    let dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetablePage');
  }
  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
}

}
