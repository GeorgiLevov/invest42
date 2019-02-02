import { AppConfig } from './../../config/app.config';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './getmanagerprofile.service';
import { AuthenticationService } from './../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ManagerProfile } from '../models/users/manager.model';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private appConfig: AppConfig,
  ) { }
  public src = this.appConfig.apiUrl;
  public managerProfile: ManagerProfile;
  managerEmail = this.authService.tokenEmail();


  public getProfile() {
    this.profileService.getManagerProfile(this.managerEmail)
      .subscribe((data: ManagerProfile) => {
        this.managerProfile = data;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  public ngOnInit() {
    this.getProfile();
  }
  // http://localhost:5500/

  logout() {
    this.authService.logout();
  }

}
