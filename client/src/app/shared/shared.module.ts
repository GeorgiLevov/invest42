import { AppConfig } from './../config/app.config';
import { ProfileService } from './profile/getmanagerprofile.service';
import { MaterializeWrapModule } from './../materialize-module/materialize.module';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { UnauthorisedComponent } from './core/errors/unauthorised/unauthorised.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule} from '@angular/material';
import { MaterialModule } from '../angular-material/angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileComponent } from './profile/profile.component';

const sharedModules = [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MaterialModule,
    MatGridListModule,
    MaterializeWrapModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule];

@NgModule({
    declarations: [
        NotFoundComponent,
        ServerErrorComponent,
        UnauthorisedComponent,
        SideNavComponent,
        ProfileComponent,
    ],
    imports: [
        ...sharedModules,
        CommonModule,
        RouterModule,
        LayoutModule,
    ],
    exports: [
        //  CommonModule,
        ...sharedModules,
        SideNavComponent,
        ProfileComponent,
    ],
    providers: [ProfileService, AppConfig],
})
export class SharedModule { }
