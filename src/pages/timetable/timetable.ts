import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
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
  task : any;
  subscription : any;
  pos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public geolocation: Geolocation,public loadingCtrl: LoadingController) {
    this.subscription= this.geolocation.watchPosition({enableHighAccuracy:true})
    .subscribe(position => {
  this.coord = this.distanceInKmBetweenEarthCoordinates(position.coords.longitude,position.coords.latitude,80.025310,13.557213)*1000.0;
  this.pos = [position.coords.latitude,position.coords.longitude,position.coords.accuracy];
  });
    this.storage.get('faculty').then((val)=>{
      this.faculty = val;
    });
    
  }
  refress()
  {
  
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
