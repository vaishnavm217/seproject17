import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

/**
 * Generated class for the AlmanacPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-almanac',
  templateUrl: 'almanac.html',
})
export class AlmanacPage {

type: string = "month";
  data:any = {};
  eventSource=[];
  viewTitle: string;
  selectedDay= new Date();
  calendar={
	  mode:'month',
	  currentDate: this.selectedDay
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  this.eventSource= this.createRandomEvents();
  }
  addEvent(){

	  //let modal = this.modalCtrl.create(AddappointmentPage);
    //modal.present();

  }



  createRandomEvents() {

  	  //  var link = 'https://www.docconsult.co.in/api/apicalendarevent.php';
  		var events_cal = [];
  		var events = [];
      /*    this.storage.get('userData').then((val) => {
  			console.log('Your id is', val['id']);
  			var myData = JSON.stringify({id: val['id']});
  			this.http.post(link, myData).map(res => res.json())
  			.subscribe(data => {
  			this.data.response = data; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
  			this.data.length=Object.keys(this.data.response).length;
  		console.log(this.data.response);
  		console.log('Hello!');
          console.log(Object.keys(this.data.response).length);
  		for (var i = 0; i < this.data.length; i += 1) {
  			var startt= new Date(this.data.response[i].app_date + ' ' + this.data.response[i].app_time);
  			var endt=   new Date(this.data.response[i].app_date + ' ' + this.data.response[i].app_time);
  			endt.setMinutes(startt.getMinutes()+ parseInt(this.data.response[i].duration) );
  			events.push({
                      title: 'Appointment with ' + this.data.response[i].patient_name ,
                      startTime: new Date(this.data.response[i].app_date + ' ' + this.data.response[i].app_time),
                      //endTime: new Date(this.data.response[i].app_date + ' ' + this.data.response[i].app_time),
                      endTime: endt ,
  					allDay: false
                  });

  			console.log('Hello');
  			console.log(this.data.response[i].app_date + ' ' + this.data.response[i].app_time);
  			console.log('Duration ' + this.data.response[i].duration);
  		}
  		//this.eventSource=events_cal;



  			}, error => {

  			console.log("Oooops!");

  			});


  		});

  		console.log(this.data.length);
  		console.log('Hello!');
          console.log(this.data.response);
      */
          for (var i = 0; i < 50; i += 1) {
              var date = new Date();
              var eventType = Math.floor(Math.random() * 2);
              var startDay = Math.floor(Math.random() * 90) - 45;
              var endDay = Math.floor(Math.random() * 2) + startDay;
              var startTime;
              var endTime;
              if (eventType === 0) {
                  startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                  if (endDay === startDay) {
                      endDay += 1;
                  }
                  endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                  events.push({
                      title: 'All Day - ' + i,
                      startTime: startTime,
                      endTime: endTime,
                      allDay: true
                  });
              } else {

                  var startMinute = Math.floor(Math.random() * 24 * 60);
                  var endMinute = Math.floor(Math.random() * 180) + startMinute;
                  startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                  endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                  events.push({
                      title: 'Event - ' + i,
                      startTime: startTime,
                      endTime: endTime,
                      allDay: false
                  });
              }
          }

          return events;
      }

      modechange(type){
      	 console.log('mode changed!');
      	 if(type == 'month'){
      			this.calendar.mode='month';
      			console.log('mode changed! month');
      	 }
      	 else if (type == 'week'){
      		    this.calendar.mode='week';
      			console.log('mode changed! week');
      	 }
      	 else if (type == 'day'){
      		    this.calendar.mode='day';
      			console.log('mode changed! day');
      	 }
       }
       onViewTitleChanged(title){
  this.viewTitle=title;
}
onTimeSelected(ev){
  console.log('Selected time: ' + ev.selectedTime.getUTCFullYear() + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);


}
onEventSelected(event){
  console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  var dateString = '2011-04-11T10:20:30Z'
  var newDate = new Date(dateString);
    console.log(newDate);
  let alert = this.alertCtrl.create({
    title: '' + event.title,
    subTitle: event.startTime,
    buttons: ['OK']
  });

  alert.present();


}





  ionViewDidLoad() {
    console.log('ionViewDidLoad AlmanacPage');
  }

}
