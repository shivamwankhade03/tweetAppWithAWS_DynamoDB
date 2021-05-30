import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TweetDetails } from './interface/tweet-details';
import { UserDetails } from './interface/user-details';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  url = environment.commonUrl;
  constructor(private http: HttpClient) { }

  getHeader() {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  signup(signUpData) {
    return this.http.post<String>(this.url + '/register', signUpData, {
      responseType: 'text' as 'json'
    });
  }
  login(loginDetails) {
    return this.http.post<any>(this.url + 'login', loginDetails);
  }

  userDetailsById(userId) {
    return this.http.get<any>(this.url + 'user/' + userId);
  }

  postTweet(userName,payload){
    return this.http.post<String>(this.url + userName +'/add', payload, {
      responseType: 'text' as 'json'
    });
  }

  getAllTweet(){
    return this.http.get<TweetDetails>(this.url + '/all');
  }

  likeUnLikeTweet(userName,tweetId,type){
    return this.http.post<any>(this.url + 'like/' +userName +'/'+tweetId + '/' + type,null);
  }

  getAllTweetByUserId(userName){
    return this.http.get<any>(this.url +'/'+userName);

  }
  replyToTweet(userName,tweetId,replyMsg){
    return this.http.post<any>(this.url + 'reply/' +userName +'/'+tweetId , replyMsg);
  }

  updateTweet(userName,tweetId,replyMsg){
    return this.http.put<UserDetails>(this.url + 'update/' +userName +'/'+tweetId , replyMsg);
  }

  deleteTweet(tweetId){
    return this.http.delete<any>(this.url + 'delete/' +'/'+tweetId);  
  }
  getAllUser(){
     return this.http.get<UserDetails[]>(this.url + 'users/' + 'all')
  }
  forgotpwd(loginDetails) {
    return this.http.post<any>(this.url +'/forgot',loginDetails);
   }
}
