import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
  arr = [ 1 , 2 , 3]; 
  course: string;

  constructor() { }

  ngOnInit(): void {
  }

   searchCourse(skill) {
    console.log("skill"+skill);
  }
}
