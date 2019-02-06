import { AuthenticationServiceMock } from './mocks/authentication-mock.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthenticationService } from '../../shared/core/authentication/authentication.service';
import { MaterialWrapModule } from '../../material-module/material.module';
import { MockProjectTreeComponent } from './mocks/project-tree-mock.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialWrapModule
            ],
            declarations: [
                HomeComponent,
                MockProjectTreeComponent,
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useClass: AuthenticationServiceMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {

        // Arrange & Act & Assert
        expect(component).toBeTruthy();
    });

    it('logout method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'logout');

        // Act
        component.logout();

        // Assert
        expect(component.logout).toHaveBeenCalledTimes(1);
    });

});
