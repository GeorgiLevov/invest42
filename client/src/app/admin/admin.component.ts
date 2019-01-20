import { AuthenticationService } from './../shared/core/authentication/authentication.service';
import { AdminService } from './services/admin.service';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';

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

  user: UserProfile;

  constructor(

    private adminService: AdminService,

    private authService: AuthenticationService,

  ) { }

  ngOnInit() {
  }

  public getUserInfo() {
    this.adminService.getUserInfo('georgelevov@gmail.com').subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
