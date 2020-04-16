// this is the Ts page of the login.

import { Component ,OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/Firebase-Authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class HomePage {
  

  validationform: FormGroup;
  errormessage: string = "";
  
 
 
 constructor(private navCtrl:NavController,private authService:AuthenticationService, private formBuilder:FormBuilder) {}
 
ngOnInit(){

  this.validationform = this.formBuilder.group({
    Email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    Password: new FormControl('', Validators.compose([
      Validators.minLength(8),
      Validators.required
    ])),
  });
}

validation_messages = {
  'Email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'pattern', message: 'Please enter a valid email.' }
  ],
  'Password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 8 characters long.' }
  ]
};


LoginUser(value){
  this.authService.LoginUser(value)
  .then(res => {
    console.log(res);
    this.errormessage = "";
    this.navCtrl.navigateForward('dashboard');
  }, err => {
    this.errormessage = err.message;
  })
}

RegisterPage(){
  this.navCtrl.navigateForward('register');
}
 
ForgotPassword(){
  this.navCtrl.navigateForward('password-reset');
}
  
}
 

