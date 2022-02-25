import { Component } from '@angular/core';
// import { SMS, SmsOptions } from '@ionic-native/sms';
import { Platform, ToastController } from '@ionic/angular';
 //import {SMS, SmsOptions }from '@ionic-native/sms/ngx';
 declare var window: any;
 import { SMS,SmsOptions } from '@awesome-cordova-plugins/sms/ngx';
 import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public smses: any;
  lat:any="";
  lon:any="";
  date:any="";
  spped:any=""; 

  chercher:any=true;

  constructor( private sms: SMS,  private platform: Platform, private toastCtrl: ToastController ,private smsRetriever: SmsRetriever) {
 
  }
  getSMS() {
    if (this.platform.is('android')) {
      const filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // following 4 filters should NOT be used together, they are OR relationship
        // read : 0, // 0 for unread SMS, 1 for SMS already read
        // _id : 1234, // specify the msg id
        // address : '+9876543210', // sender's phone number
        body: '', // content to match
        // following 2 filters can be used to list page up/down
        indexFrom: 0, // start from index 0
        maxCount: 1, // count of SMS to return each time
      };
     // window.alert (window.SMS)

      if (window.SMS) window.SMS.listSMS(filter, data => {
       // window.alert (data) 
        setTimeout(() => { 
          for (let i = 0; i < data.length; i++) { 
              let msg = data[i]
              this.parsedata(msg.body)
           //   window.alert(msg.address+" "+msg.body) 
          } 
        //  console.log(data);
          this.smses = JSON.stringify(data);
        }, 0)
      }, error => {
        window.alert(JSON.stringify(error))
        console.log(error);
      });
    }
  }

  parsedata(ch:any)
  {
     let tab =ch.split(','); 
    let val = tab[0].split(':')    
    localStorage.setItem("lat", JSON.stringify(val[1])); //store lat
    this.lat=val[1]

    val = tab[1].split(':')
    localStorage.setItem("lon", JSON.stringify(val[1])); //store lon
    this.lon=val[1]

    val = tab[2].split(':')
    localStorage.setItem("course", JSON.stringify(val[1])); //store course
    
    val = tab[3].split(':')
    localStorage.setItem("speed", JSON.stringify(val[1])); //store speed
    this.spped=val[1]

    val = tab[4].split(':')
    localStorage.setItem("date", JSON.stringify(val[1]+":"+val[2]+":"+val[3]+":"+val[4])); //store date
    this.date=val[1]+":"+val[2]+":"+val[3]+":"+val[4]
  }
 
  sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }
   // temps d'attente pour le traitement de fonction 
   delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async action()
  {
     this.sendsms()
     this.chercher=false;
     await this.delai(10000);
    this.getSMS()
    this.chercher=true;
  }
  sendsms() {
    
     var option :SmsOptions={
       replaceLineBreaks:false,
       android:{
         intent:''
       }
     }
    this.sms.send('21120179', 'WHERE#',option).then(
      (data)=>{
     // alert(JSON.stringify(data));

    }
      ,(err)=>{
        alert(JSON.stringify(err))

    })

  }

}
