import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApiServiceService } from '../common/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  userType: boolean = false;
  userAdded: boolean = false;
  signupErrorMessage: any;
  mentorAdded: boolean = false;
  newUserAdded: boolean = true;
  userAlreadyExits:boolean =false;

  constructor(private formBuilder: FormBuilder,private route:Router, public _datepipe: DatePipe,private  apiService:ApiServiceService) { }

  ngOnInit() {
    let curDate = this._datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.signUpForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
        Validators.maxLength(50)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(50)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]],
      dateOfBirth: [curDate],
      gender: ["Male", [
        Validators.required,
      ]],
      contactNumber:[,[Validators.required]],
      logInId:['',[Validators.required]]
    })
  }


get logInId() {
  return this.signUpForm.get('logInId');
}
  get email() {
    return this.signUpForm.get('email');
  }
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get contact() {
    return this.signUpForm.get('contact');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  

  get contactNumber() {
    return this.signUpForm.get('contactNumber');
  }
  get dateOfBirth() {
    return this.signUpForm.get('dateOfBirth');
  }
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }


  addUser(signUpForm) {
    console.log("Login form "+JSON.stringify(signUpForm));
    let response ="";
    this.apiService.signup(signUpForm).subscribe((data)=>{
        console.log("User added successfully !!"+data);
        this.route.navigate(['login']);

    }, (error) => {
      this.signupErrorMessage = error.message;
  
      console.error('Error message 1' + error.message);
      console.error('Error message 2 ===>' + error.error.Message);
     
      // console.error('Error message 3' + error.status);
     if(error.error.Message == 'Login Id is already exits' || error.status==400){
     this.password.setValue('');
     this.confirmPassword.setValue('');
     
      this.userAlreadyExits=true;
     
     }

    });
 
  }
}
