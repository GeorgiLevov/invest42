import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatCheckboxModule, MatCardModule, MatExpansionModule, MatPaginatorModule, MatTableModule, MatInputModule
    , MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatStepperModule, MatTabsModule, MatButtonToggleModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule, MatSnackBarModule
} from '@angular/material';

const M_MODULES = [
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
];


@NgModule({
    imports: M_MODULES,
    exports: M_MODULES,
})
export class MaterializeWrapModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterializeWrapModule,
        };
    }
}
