import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
//import { LocalStorageService, SessionStorageService } from 'angular-web-storage';




@Component({
  selector: 'otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otpForm: FormGroup;
  userName : string;
  otp : number=0;

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
    console.log('Value'+values['otpNo']);
    console.log('OTP'+this.otp);
if(values['otpNo']== this.otp)
{
  alert('OTP Match');
  this.router.navigate(['confirm-pwd/'+this.userName]);
}
else{
  alert('Not match');
}

  }
  generateOTP()
  {
    this.authService.biws_generateOTP().subscribe(result=>{console.log(result);
      this.otp=result;
      this.otpForm.controls['sendOTP'].setValue(result);
    })
    if(this.otp!=0)
    {
      this.authService.biws_sendOTP(this.otp, this.userName).subscribe(result=>{console.log(result);
    })
   
     
    }
  }
 

}