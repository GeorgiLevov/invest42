import { UserRegisterData } from './../../../models/user-register.model';
import { AdminService } from './../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientRegisterData } from '../../../models/client-register.model';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})

export class AddClientComponent {
    constructor(
        public dialogRef: MatDialogRef<AddClientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ClientRegisterData,
        public adminService: AdminService,
    ) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
            this.formControl.hasError('email') ? 'Not a valid email' :
                '';
    }

    submit() {
        // emppty stuff
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmAdd(): void {
        this.adminService.addClient(this.data);
    }
}
