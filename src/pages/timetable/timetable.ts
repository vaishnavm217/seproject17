import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Http,Headers, RequestOptions, Response} from '@angular/http';
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
  mess : any;
  roll_count = 0;
  stat = "Start";
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public geolocation: Geolocation,public loadingCtrl: LoadingController, public http: Http) {
  //   this.subscription= this.geolocation.watchPosition({enableHighAccuracy:true})
  //   .subscribe(position => {
  // this.coord = this.distanceInKmBetweenEarthCoordinates(position.coords.longitude,position.coords.latitude,80.025310,13.557213)*1000.0;
  // this.pos = [position.coords.latitude,position.coords.longitude,position.coords.accuracy];
  // });
  //   this.storage.get('faculty').then((val)=>{
  //     this.faculty = val;
  //   });
  this.mess = "Attendance Not Started";
  this.http.get("http://10.0.3.22:8000/api/add_view_SC/").map(res=>res.json()).subscribe((jsonresp)=>{
    for(let i =0;i<jsonresp.length;i++)
    {
      if(jsonresp[i].Course_ID==this.course_id)
      {
          this.stud_arr.push(jsonresp[i].Student_ID);
      }
    }
  });
  }
  refress()
  {
    console.log("refress");
    if(!this.times){
      this.times=1;
      console.log("refress1");
    this.sub=this.geolocation.watchPosition({enableHighAccuracy:true})
      .subscribe(position => {
        console.log("Subs went!");
       console.log(position.coords.accuracy);
    if(position.coords.accuracy<=30000 && this.flag)
    {
      this.secret_key = parseInt(1000+Math.random()*8999+"");
      this.stat = "Stop";
      let loc = position.coords.longitude+";"+position.coords.latitude+";"+this.secret_key;
      this.mess="The secret key is :"+this.secret_key;
      this.flag=false;
      let body ={
        Course_Slot:1,Date_time:new Date(),Status:1,Location:loc
      };
      console.log(loc);
      let headers = new Headers({
        'Content-Type' : 'application/json',
      });
      // loading.present();
      let options = new RequestOptions({ headers: headers});
      this.http.post('http://10.0.3.22:8000/api/add_view_attendance_sessions/',body,options).subscribe((jsonr)=>{console.log("success!");},(err)=>{console.log("Failed!");});
      this.http.get("http://10.0.3.22:8000/api/add_view_attendance_sessions/").map(res=>res.json()).subscribe((jsonresp)=>{
     // this.mess+="<br>Lecture id:"+this.atten_id;
      this.atten_id = jsonresp[jsonresp.length-1].Session_ID;
        console.log("attend",this.atten_id);
        this.mess+="\nLecture id:"+this.atten_id;
  this.inter = setInterval(()=>{this.refreshfn()},1000);
  
      });
      this.sub.unsubscribe();
    }
  },(error)=>{
    this.mess="Error in geolocation";
  });
}
else{
  clearInterval(this.inter);
  console.log("timer cleared");
  this.mess = "Attendance Stopped"; 
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
  refreshfn(){
    console.log("Hello");
    this.http.get("http://10.0.3.22:8000/api/add_view_attendance/").map(res=>res.json()).subscribe((jsonresp)=>{
    console.log("found resp",jsonresp);
    for(let i=0;i<jsonresp.length;i++)
      {
        if(jsonresp[i].ASession_ID==this.atten_id)
        {
          if(!this.studs[jsonresp[i].Student_ID])
          {this.studs[jsonresp[i].Student_ID] = 1;
            this.roll_count+=1;
          }
        }
      }
      console.log(this.studs);
    });
    console.log("things",this.stud_arr);
    if(Object.keys(this.studs).length==this.stud_arr.length ){
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

}
