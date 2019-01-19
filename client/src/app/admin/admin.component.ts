import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public navMenu = [
    {
      text: 'Home',
      route: '/admin/home',
      path: 'home',
      isActive: false,
    },
    {
      text: 'Admins',
      route: '/admin/admin-list',
      path: 'admin-list',
      isActive: false,
    },
    {
      text: 'Managers',
      route: '/admin/manager-list',
      path: 'manager-list',
      isActive: false,
    },
    {
      text: 'Clients',
      route: '/admin/client-list',
      path: 'client-list',
      isActive: false,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
