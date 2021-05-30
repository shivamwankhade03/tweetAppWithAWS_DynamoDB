import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiServiceService } from '../common/api-service.service';
import { TweetDetails } from '../common/interface/tweet-details';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  @Input() tweet: TweetDetails;
  @Output() newItemEvent = new EventEmitter();
  
  isLikeed: boolean = true;
  count: number;
  tweetField = new FormControl('');
  editTweet= new FormControl('');
  
  constructor(private apiService: ApiServiceService) {}
  ngOnChange() {}
 
  ngOnInit(): void {
    console.info('Tweet info ', this.tweet);
    this.isLikeed = this.tweet.likeBy.includes(localStorage.getItem('userName'));
    console.info('Tweet conatins i id',
      this.tweet.likeBy.includes(localStorage.getItem('userName'))
    );
    console.info('is like value', this.isLikeed);
    this.count = this.tweet.like;
    this.editTweet.setValue(this.tweet.tweetMsg);
  }

  dataDiff(tweetDate) {
    let firstDate = new Date(tweetDate);
    let currentDate = new Date().toISOString();
    let newDate = new Date(currentDate.toString());

    let firstDateinSecond = firstDate.getTime() / 1000;
    let secondDateinSecond = newDate.getTime() / 1000;
    let diff = Math.abs(firstDateinSecond - secondDateinSecond);

    if (diff < 60) {
      return Math.floor(diff) + ' seconds ago';
    } else if (diff < 3600) {
      return Math.floor(diff / 60) + ' minutes ago';
    } else if (diff < 86400) {
      return Math.floor(diff / 3600) + ' hours ago';
    } else {
      return firstDate.toDateString();
    }
  }

  like() {
    this.isLikeed = !this.isLikeed;

    if (this.isLikeed) {
      this.count = this.count + 1;
    } else {
      this.count = this.count - 1;
    }
    const userName = localStorage.getItem('userName');
    this.apiService
      .likeUnLikeTweet(userName, this.tweet.id, this.isLikeed)
      .subscribe(
        (data) => {},
        (error) => {}
      );
    console.info('clicked !! ' + this.isLikeed);
  }

  replyTweet(){
    const tweetText = this.tweetField.value;
    console.info("Reply : "+tweetText);
    const userName =localStorage.getItem('userName');
    this.apiService.replyToTweet(userName,this.tweet.id,tweetText).subscribe((data)=>{
        console.info("Tweet reply : ",data);
        this.addNewItem("new comment");
    },(errr)=>{

    })
    this.ngOnInit();
    this.tweetField.setValue('');

  }

  updateTweet(){
    const tweetText = this.editTweet.value;
    console.info("Updated tweet : "+tweetText);
    const userName =localStorage.getItem('userName');
    this.apiService.updateTweet(userName,this.tweet.id,tweetText).subscribe((data)=>{
        console.info("Tweet reply : ",data);
        this.addNewItem("update tweet");
    },(errr)=>{

    })

    this.editTweet.setValue('');
    this.ngOnInit();
  }

  deleteTweet(){
   
    console.info(" tweet getting delete : ");
    const userName =localStorage.getItem('userName');
    this.apiService.deleteTweet(this.tweet.id).subscribe((data)=>{
        console.info("Delete tweet : ",data);
        this.addNewItem("delete tweet");
    },(errr)=>{

    })

    
  }
  
  addNewItem(value) {
    this.newItemEvent.emit(value);
  }
}
