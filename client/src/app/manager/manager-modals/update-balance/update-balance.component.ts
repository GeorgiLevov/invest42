import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';

@Component({
    selector: 'app-update-balance',
    templateUrl: './update-balance.component.html',
    styleUrls: ['./update-balance.component.css']
})
export class UpdateBalanceComponent {

    constructor(
        public dialogRef: MatDialogRef<UpdateBalanceComponent>,
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
        this.managerService.updateBalance(this.data).subscribe(
            data => this.toastr.success('', 'Successfully updated balance', { timeOut: 1000 })
        );
    }
}
