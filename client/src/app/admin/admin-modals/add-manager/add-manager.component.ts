import { UserRegisterData } from './../../../models/user-register.model';
import { AdminService } from './../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-manager',
    templateUrl: './add-manager.component.html',
    styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent {
    constructor(
        public dialogRef: MatDialogRef<AddManagerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserRegisterData,
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

    public confirmAdd(): void {
        this.adminService.addUser(this.data);
    }
}
