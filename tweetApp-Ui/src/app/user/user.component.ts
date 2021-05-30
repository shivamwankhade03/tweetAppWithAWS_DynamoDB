import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '../common/interface/user-details';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
@Input() user:UserDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
