import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'app-baza.dialog',
    templateUrl: './edit.dialog.component.html',
    styleUrls: ['./edit.dialog.component.css']
})
export class EditDialogComponent {


    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public adminService: AdminService
    ) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
            this.formControl.hasError('email') ? 'Not a valid email' : '';
    }

    // submit() {
    //     // emppty stuff
    // }

    onNoClick(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {
        this.adminService.updateUser(this.data);
    }
}
