import { Component } from '@angular/core';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
 
 import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  OTP: string = '';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  constructor(private sms: SMS, private router: Router, private toastCtrl: ToastController,private smsRetriever: SmsRetriever ) {
    

    this.smsRetriever.getAppHash()
  .then((res: any) => {console.log(res); this.presentToast(res+"ok", 'bottom', 500);})
  .catch((error: any) => {console.log(error); this.presentToast(error+"er", 'bottom', 500);});
this.smsRetriever.startWatching()
  .then((res: any) => {console.log(res); this.presentToast(res+"ok", 'bottom', 500);})
  .catch((error: any) => {console.log(error); this.presentToast(error+"er", 'bottom', 500);});

  }


  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }



  start() {
  
    
    






    this.presentToast('0', 'bottom', 1500);
   // SMSReceive.stopWatch(() => { console.log('watch stopped') },() => { console.log('watch stop failed') })

    this.smsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);    this.presentToast(res, 'bottom', 500);    })
      .catch((error: any) => console.error(error));
    this.presentToast('dddd', 'bottom', 500);

     
  }

  processSMS(data) {
    // Design your SMS with App hash so the retriever API can read the SMS without READ_SMS permission
    // Attach the App hash to SMS from your server, Last 11 characters should be the App Hash
    // After that, format the SMS so you can recognize the OTP correctly
    // Here I put the first 6 character as OTP
    const message = data.Message;
    if (message != -1) {
      this.OTP = message.slice(0, 6);
      console.log(this.OTP);
      this.OTPmessage = 'OTP received. Proceed to register';
      this.presentToast('SMS received with correct app hash', 'bottom', 1500);
    }
  }

  register() {
    if (this.OTP != '') {
      this.presentToast('You are successfully registered', 'bottom', 1500);
      // this.router.navigate(['/home'])
    }
    else {
      this.presentToast('Your OTP is not valid', 'bottom', 1500);
    }
  }


  sendsms() {
    this.start();

    
    //  var option :SmsOptions={
    //    replaceLineBreaks:false,
    //    android:{
    //      intent:''
    //    }
    //  }
    // this.sms.send('21120179', 'WHERE#',option).then(
    //   (data)=>{
    //   alert(JSON.stringify(data));

    // }
    //   ,(err)=>{
    //     alert(JSON.stringify(err))

    // })

  }

}
