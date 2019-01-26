import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {

    constructor(
        public dialogRef: MatDialogRef<EditClientComponent>,
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
        this.adminService.updateClient(this.data);
    }
}
