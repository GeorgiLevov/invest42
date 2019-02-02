import { AppConfig } from './../config/app.config';
import { ProfileService } from './profile/getmanagerprofile.service';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { UnauthorisedComponent } from './core/errors/unauthorised/unauthorised.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileComponent } from './profile/profile.component';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { MaterialWrapModule } from '../material-module/material.module';
import { SlideshowModule } from 'ng-simple-slideshow';


@NgModule({
    declarations: [
        NotFoundComponent,
        ServerErrorComponent,
        UnauthorisedComponent,
        SideNavComponent,
        ProfileComponent,
        ProjectTreeComponent,
    ],
    imports: [
        MaterialWrapModule,
        CommonModule,
        RouterModule,
        LayoutModule,
    ],
    exports: [
        //  CommonModule,
        SlideshowModule,
        MaterialWrapModule,
        SideNavComponent,
        ProfileComponent,
        ProjectTreeComponent,
    ],
    providers: [ProfileService, AppConfig],
})
export class SharedModule { }
