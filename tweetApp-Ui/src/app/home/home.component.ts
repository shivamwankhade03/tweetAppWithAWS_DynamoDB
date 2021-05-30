import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../common/api-service.service';
import { TweetDetails } from '../common/interface/tweet-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTweets :TweetDetails[]; 
  postTweet:FormGroup;
  course: string;
  tweetField = new FormControl('');
  isEmpty:boolean= false;
  tweetObj :any ={}

  constructor(private router: Router,private apiService:ApiServiceService) {
  }
  ngOnInit(): void {
  
    this.apiService.getAllTweet().subscribe(async(data : any)=>{
        this.allTweets = data;
        if(this.allTweets.length>0){
          console.info("All tweets are : ",this.allTweets);
        }else{
          this.isEmpty =true;
          console.info("List is empty: ",this.allTweets);  
        }

      },(error)=>{

    })

  
  }
  
  searchCourse(skill) {
    console.log("skill"+skill);
  }

  createTweetPayload(tweetText){

    this.tweetObj['tweetMsg']=tweetText;
    this.tweetObj['userId']=localStorage.getItem('userName');
    this.tweetObj['like']=0;
    this.tweetObj['firstName']= localStorage.getItem('firstName');
    this.tweetObj['lastName']= localStorage.getItem('lastName');
    this.tweetObj['time']='2010-10-10';
    this.tweetObj['commetsList']=0;
    
    return this.tweetObj;
  }
  tweetFun(){
    const tweetText = this.tweetField.value;
      console.info("Tweet : "+tweetText);
      const userName =localStorage.getItem('userName');
      const payload = this.createTweetPayload(tweetText);

      this.apiService.postTweet(userName,payload).subscribe((data)=>{
          console.info("Tweet status : ",data);
          this.ngOnInit();
      },(errr)=>{

      })

      this.tweetField.setValue('');
  }
  login()
  {
    this.router.navigate(['login']);
  }

  addItem(event){
    this.ngOnInit();
  }
}
