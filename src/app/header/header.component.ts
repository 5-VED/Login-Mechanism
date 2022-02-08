import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isLogout = false;

  //Method call on click of Logout button click
  OnClick(): void {
    this.isLogout = true;
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  //Method call on click of Server side button click
  serverSidePagination() {
    this.router.navigate(['serverpagination']);
  }

   //Method call on click of Server side button click
   clientSidePagination() {
    this.router.navigate(['clientpagination']);
  }
}
