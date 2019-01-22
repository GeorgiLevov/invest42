import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-edit-admin',
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {


    constructor(
        public dialogRef: MatDialogRef<EditAdminComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public adminService: AdminService,
    ) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
            this.formControl.hasError('email') ? 'Not a valid email' : '';
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {
        this.adminService.updateUser(this.data);
    }
}
