import { NgModule } from '@angular/core'; //importing NgModule  
import { IonicPageModule } from 'ionic-angular';  //Importing IonicPageModule
import { DashboardPage } from './dashboard';  //importing dashboard

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
