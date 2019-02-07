import { ProfileComponent } from './profile.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { MaterialWrapModule } from '../../material-module/material.module';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ProfileServiceMock } from './mocks/profile-mock.service';
import { ProfileService } from './getmanagerprofile.service';
import { RouterModule, Router } from '@angular/router';
import { CapitalizeFirstPipe } from '../core/pipes/capitalizefirst.pipe';
import { AppConfig } from '../../config/app.config';
import { AuthenticationServiceMock } from './mocks/authentication-mock.service';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let profileService: ProfileServiceMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialWrapModule,
                RouterModule,
            ],
            declarations: [
                ProfileComponent,
                CapitalizeFirstPipe,
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useClass: AuthenticationServiceMock,
                },
                {
                    provide: ProfileService,
                    useClass: ProfileServiceMock,
                },
                {
                    provide: AppConfig,
                    useClass: AppConfig,
                },
                {
                    provide: Router,
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
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

    it('backToClients method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'backToClients');

        // Act
        component.backToClients();

        // Assert
        expect(component.backToClients).toHaveBeenCalledTimes(1);
    });

    it('getProfile method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'getProfile');

        // Act
        component.getProfile();

        // Assert
        expect(component.getProfile).toHaveBeenCalledTimes(1);
    });

    it('src variable should be initialized', () => {

        // Arrange & Act & Assert
        expect(component.src).toBe('http://localhost:5500');
    });

    it('managerEmail variable should be initialized', () => {

        // Arrange & Act & Assert
        expect(component.managerEmail).toBe('mock_email@gmail.com');
    });

    it('getProfile method should be called OnInit', () => {

        // Arrange
        spyOn(component, 'getProfile');

        // Act
        component.ngOnInit();

        // Assert
        expect(component.getProfile).toHaveBeenCalledTimes(1);
    });

    it('profileService, method getManagerProfile should be called 1 time ', async () => {

        // Arrange
        profileService = new ProfileServiceMock();
        spyOn(profileService, 'getManagerProfile');

        // Act
        profileService.getManagerProfile('mock_email@gmail.com');

        // Assert
        expect(profileService.getManagerProfile).toHaveBeenCalledTimes(1);
    });

    it('profileService, method getManagerProfile should not throw error', async () => {

        // Arrange
        profileService = new ProfileServiceMock();
        spyOn(profileService, 'getManagerProfile');

        // Act
        profileService.getManagerProfile('mock_email@gmail.com');

        // Assert
        expect(profileService.getManagerProfile).not.toThrow();
    });


});

