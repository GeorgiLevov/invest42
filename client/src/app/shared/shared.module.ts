import { MaterializeWrapModule } from './../materialize-module/materialize.module';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { UnauthorisedComponent } from './core/errors/unauthorised/unauthorised.component';
import { MzSidenavModule, MzButtonModule } from 'ngx-materialize';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NotFoundComponent,
        ServerErrorComponent,
        UnauthorisedComponent,
        SideNavComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterializeWrapModule
    ],
    exports: [
        //  CommonModule,
        SideNavComponent,
    ],
    providers: [],
})
export class SharedModule { }
