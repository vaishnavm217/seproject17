import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public file : File, public fileopener: DocumentViewer) {
  
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursedetailPage');
  }
  OpenFile(){
    console.log(this.file.applicationDirectory);
    const alert = this.alertCtrl.create({
      title: 'Dir',
      subTitle: this.file.externalDataDirectory,
      buttons: ['ok']
    });
    alert.present();
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    };
    this.fileopener.viewDocument("assets/file/file.pdf",'application/pdf',options);
    // this.fileopener.open(this.file.+"/assets/file/file.pdf",'application/pdf')
//     const options: DocumentViewerOptions = {
//       title: 'My PDF'
//     };
// this.document.viewDocument('../../assets/file/file.pdf', , options);
  }

}
