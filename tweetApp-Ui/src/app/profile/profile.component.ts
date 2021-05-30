import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; //imports
import { Router } from '@angular/router';
import { ApiServiceService } from '../common/api-service.service';
import { TweetDetails } from '../common/interface/tweet-details';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordForm =  FormGroup;
  arr = [ 1 , 2 , 3]; 
  userDetails:any ={};
  joinedDate :any;
  tweetByUser : TweetDetails[]=[]


  constructor(private apiService:ApiServiceService,private router:Router) { }

  ngOnInit(): void {

    this.joinedDate= new Date();
    this.apiService.userDetailsById(localStorage.getItem('userName')).subscribe((data)=>{
        console.log("UserId data is "+JSON.stringify(data));
        this.userDetails.userId = data.logInId; 
        this.userDetails.firstName = data.firstName; 
        this.userDetails.lastName = data.lastName; 
        this.userDetails.gender = data.gender; 
        this.userDetails.dateOfBirth = data.dateOfBirth; 
        
        // console.log(this.userDetails.userId+data.userId);

    }, (error: HttpErrorResponse) => {
      console.log('Error message ' + error.message);
      if (error instanceof Error) {
      } else {
      }
    })

    this.apiService.getAllTweetByUserId(localStorage.getItem('userName')).subscribe((data)=>{

      this.tweetByUser = data;
    },(error)=>{})

  }

  back(){
    this.router.navigate(['layout/home'])
  }
  addItem(event){
    this.ngOnInit();
  }
}
