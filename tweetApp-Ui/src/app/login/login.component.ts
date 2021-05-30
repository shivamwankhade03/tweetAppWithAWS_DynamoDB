import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../common/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgetpwd: FormGroup;
  changeType: boolean;
  forgetPwdFlag: boolean = false;
  invalidInput: boolean = false;
  isEmailIdExits : boolean =false;
  loginDetails:any={};

  constructor(
    private formBuild: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService
  ) {
    this.forgetPwdFlag = false;
  }

  ngOnInit() {
    localStorage.removeItem('userName');
    localStorage.removeItem('email')
    this.forgetPwdFlag = false;
    this.loginForm = this.formBuild.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.forgetpwd = this.formBuild.group({
      userNamePwd: ['', Validators.required],
      newPwd: ['', [Validators.required, Validators.maxLength(50)]],
      confirmNewPwd: [
        '',
        [Validators.required, this.matchConfirmPassword.bind(this)],
      ],
    });
  }
  get confirmNewPwd() {
    return this.forgetpwd.get('confirmNewPwd');
  }
  get newPwd() {
    return this.forgetpwd.get('newPwd');
  }

  toSignup() {
    this.router.navigate(['signup']);
  }
  submit(loginForm) {
    console.log('Login form ' + JSON.stringify(loginForm));
    this.apiService.login(loginForm).subscribe(
      (data) => {

        console.log('Login successful' + JSON.stringify(data));
        localStorage.setItem('userName', data.logInId);
        localStorage.setItem('email', data.email)
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)

        this.router.navigate(['layout/home']);
      },
      (error) => {
        console.error('Error message 1' + error.message);
        console.error('Error message 2 ===>' + error.error.Message);
        console.error('Error message 3' + error.status);
        if (error.error.Message == 'Invalid Input') {
          this.invalidInput = true;
        }
      }
    );
  }

  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.forgetpwd) {
      if (
        formControl.value &&
        formControl.value.length > 0 &&
        formControl.value !== this.forgetpwd.get('newPwd').value
      ) {
        return { nomatch: true };
      }
    }
    return null;
  }

  forgetPwdCall() {
    this.isEmailIdExits=false;
    this.forgetPwdFlag = true;
  }
  savePwd(forgetpwd) {
    this.forgetPwdFlag = false;
    this.loginDetails['userName']= forgetpwd.userNamePwd;
    this.loginDetails['password']= forgetpwd.newPwd;
    console.log('new pwd details' +(this.loginDetails));
  
    this.apiService.forgotpwd(this.loginDetails).subscribe((data)=>{

      if(data== 'true'){
        console.log("Password updated successfully !!");
        this.isEmailIdExits=false;
        this.invalidInput=false;
      }
      this.forgetpwd.reset();
    },(error)=>{
      
      console.error('Error message 2 ===>' + error.error.Message);
      if(error.error.Message == "User with this email not exits")
        {
            this.isEmailIdExits=true;
            this.invalidInput=false;
      }
      this.forgetpwd.reset();
    })
  
  }
}
