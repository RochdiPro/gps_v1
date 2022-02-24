import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 import { IonicStorageModule } from '@ionic/storage';
 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import {SMS }from '@ionic-native/sms/ngx';  
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

import { AndroidPermissions} from '@ionic-native/android-permissions/ngx';
  
@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,IonicStorageModule,
  
  
  ],
  providers: [  SMS, SmsRetriever, AndroidPermissions, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
