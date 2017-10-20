import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursedetailPage } from './coursedetail';

@NgModule({
  declarations: [
    CoursedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursedetailPage),
  ],
})
export class CoursedetailPageModule {}
