import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlmanacPage } from './almanac';

@NgModule({
  declarations: [
    AlmanacPage,
  ],
  imports: [
    IonicPageModule.forChild(AlmanacPage),
  ],
})
export class AlmanacPageModule {}
