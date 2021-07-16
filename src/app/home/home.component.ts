import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  obj:any;
  constructor(private router: Router) {
    this.obj = this.router.getCurrentNavigation().extras.state.name;
  
   }

  ngOnInit() {
    console.log("what",this.obj)
  }

  logOut(){
    localStorage.removeItem("userfound");
    this.router.navigate(['/login']);
  }
}
