import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
userName:string='';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['layout/home']); 
    this.userName=localStorage.getItem('userName');   
  }
  login()
  {
    this.router.navigate(['login']);
  }
  searchCourse(skill) {
    console.log("skill"+skill);
  }
}
