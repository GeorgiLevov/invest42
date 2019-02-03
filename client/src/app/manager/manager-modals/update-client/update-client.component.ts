import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';

@Component({
    selector: 'app-update-client-info',
    templateUrl: './update-client.component.html',
    styleUrls: ['./update-client.component.css']
})
export class UpdateClientInfoComponent {

    constructor(
        public dialogRef: MatDialogRef<UpdateClientInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public managerService: ManagerService,
        private toastr: ToastrService,
    ) { }

    formControl = new FormControl('', [
        Validators.required
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    cancel(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {
        this.managerService.updateClientInfo(this.data).subscribe(
            data => this.toastr.success('', 'Successfully edited account!')
        );
    }
}
