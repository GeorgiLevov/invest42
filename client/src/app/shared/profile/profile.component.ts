import { AppConfig } from './../../config/app.config';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './getmanagerprofile.service';
import { AuthenticationService } from './../core/authentication/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  @Input() managing;

  public src = this.appConfig.apiUrl;
  public managerProfile: ManagerProfile;
  managerEmail = this.authService.tokenEmail();


  public getProfile() {
    this.profileService.getManagerProfile(this.managerEmail)
      .subscribe((data: ManagerProfile) => {
        this.managerProfile = data;
      }, (error: HttpErrorResponse) => { });
  }

  public ngOnInit() {
    this.getProfile();
  }

  backToClients() {
    this.router.navigate([`manager/clients/`]);
  }

  logout() {
    this.authService.logout();
  }

}
