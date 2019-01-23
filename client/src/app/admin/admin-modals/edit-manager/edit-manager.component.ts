import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-edit-manager',
    templateUrl: './edit-manager.component.html',
    styleUrls: ['./edit-manager.component.css']
})
export class EditManagerComponent {


    constructor(
        public dialogRef: MatDialogRef<EditManagerComponent>,
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
