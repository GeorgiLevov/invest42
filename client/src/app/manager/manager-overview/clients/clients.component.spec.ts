import { ClientsComponent } from './clients.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { MaterialWrapModule } from '../../../material-module/material.module';
import { RouterModule, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ManagerService } from '../../services/manager.service';
import { ManagerServiceMock } from './mocks/manager-mock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientsComponent', () => {
    let component: ClientsComponent;
    let fixture: ComponentFixture<ClientsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialWrapModule,
                RouterModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                ClientsComponent,
            ],
            providers: [
                {
                    provide: ManagerService,
                    useClass: ManagerServiceMock,
                },
                {
                    provide: Router,
                },
                {
                    provide: MatDialog,
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {

        // Arrange & Act & Assert
        expect(component).toBeTruthy();
    });

    it('getClients method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'getClients');

        // Act
        component.getClients();

        // Assert
        expect(component.getClients).toHaveBeenCalledTimes(1);
    });

    it('applyFilter method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'applyFilter');

        // Act
        component.applyFilter('desc');

        // Assert
        expect(component.applyFilter).toHaveBeenCalledTimes(1);
    });

    it('refreshTable method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'refreshTable');

        // Act
        component.refreshTable();

        // Assert
        expect(component.refreshTable).toHaveBeenCalledTimes(1);
    });

    it('manage method should be called 1 time', () => {

        // Arrange
        spyOn(component, 'manage');

        // Act
        component.manage(1);

        // Assert
        expect(component.manage).toHaveBeenCalledTimes(1);
    });

    it('getClients method should be called OnInit', () => {

        // Arrange
        spyOn(component, 'getClients');

        // Act
        component.ngOnInit();

        // Assert
        expect(component.getClients).toHaveBeenCalledTimes(1);
    });

});

