import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { UserDetails } from '../interface/user-details';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userName:string = '';
  originalLists:UserDetails[]=[];
  filteredList:UserDetails[]=[];
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getAllUser().subscribe((data)=>{
      this.originalLists=data;
      this.filteredList=this.originalLists;
      console.log("Filterd list initial ",this.filteredList);
  },(error)=>{})
  }
  search(userName){
    console.info("Search ",this.userName)
    this.filteredList=this.originalLists.filter(user=>user.logInId.toLocaleLowerCase().includes(this.userName.toLocaleLowerCase()));
    console.log("Filterd list while searching : ",this.filteredList);
    //  this.apiService.getSubject().next(this.filteredList);
  }
}
