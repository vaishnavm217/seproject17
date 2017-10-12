import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AlmanacPage } from '../pages/almanac/almanac';
import { CoursePage } from '../pages/course/course';
import { TimetablePage } from '../pages/timetable/timetable';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { NgCalendarModule } from 'ionic2-calendar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geofence } from '@ionic-native/geofence';
import { Pro } from '@ionic/pro';

const IonicPro = Pro.init('5e0172a6', {
  appVersion: "0.0.1"
});

export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DashboardPage,
    AlmanacPage,
    CoursePage,
    TimetablePage,
    LoginPage,
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DashboardPage,
    AlmanacPage,
    CoursePage,
    TimetablePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geofence,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
