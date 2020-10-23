import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
//import { LocalStorageService, SessionStorageService } from 'angular-web-storage';




@Component({
  selector: 'assoc-otp-verification',
  templateUrl: './assoc-otp-verification.component.html',
  styleUrls: ['./assoc-otp-verification.component.scss']
})
export class AssocOtpVerificationComponent implements OnInit {

  otpForm: FormGroup;
  userName : string;
  otp : number=0;
  otp_ID :string;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router : Router,
    private activatedRoute: ActivatedRoute
   // @Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
   ) {
    
    this.otpForm = new FormGroup(
      {
        otpNo: new FormControl(),
        sendOTP : new FormControl()
      })
      //this.userName=JSON.parse(this.local.get('username'));

   }

  ngOnInit() {
    this.otpForm = this._formBuilder.group({
      otpNo   : ['', Validators.required],
      sendOTP :['', Validators.required]
  });
  this.activatedRoute.params.subscribe((params: Params) => {
    
    this.userName=params['name'];
   
    
  });
  this.generateOTP();
  
 
  }
  verifyOTP(values)
  {
    /*console.log('Value'+values['otpNo']);
    console.log('OTP'+this.otp);
if(values['otpNo']== this.otp)
{
  alert('OTP Match');
  this.router.navigate(['assoc-confirm-pwd/'+this.userName]);
}
else{
  alert('Not match');
}*/
this.authService.verify_OTP(this.otp_ID,values['otpNo']).subscribe(result=>{console.log(result);
  if(result['Status']=='Success')
  {
    alert(result['Details']);
    this.router.navigate(['confirm-pwd/'+this.userName]);
  }
  else{
    alert(result['Details']);
  }
})

  }
  generateOTP()
  {
    this.authService.biws_generateOTP(this.userName).subscribe(result=>{console.log(result);
      //this.otp=result;
      //this.otpForm.controls['sendOTP'].setValue(result);
      if(result['Status']=='Success')
      {
        this.otp_ID=result['Details'];
        alert('OTP send successfully!!');

      }
      else{
        alert('Please check phone number entered!!');
      }
    })
  }
 

}