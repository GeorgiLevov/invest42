import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatCheckboxModule, MatCardModule,
    MatPaginatorModule, MatTableModule, MatInputModule,
    MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatStepperModule, MatTabsModule, MatButtonToggleModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule, MatSortModule, MatNativeDateModule, MatExpansionModule, MatDialogModule, MatTreeModule
} from '@angular/material';

const M_MODULES = [
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
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
    MatSortModule,
    MatButtonModule,
    MatNativeDateModule,
    MatTreeModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
];


@NgModule({
    imports: M_MODULES,
    exports: M_MODULES,
})
export class MaterialWrapModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialWrapModule,
        };
    }
}
