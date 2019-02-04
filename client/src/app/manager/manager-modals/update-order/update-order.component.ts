import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-order',
    templateUrl: './update-order.component.html',
    styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {

    constructor(
        public dialogRef: MatDialogRef<UpdateOrderComponent>,
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
        this.managerService.updateOrder(this.data).subscribe(
            data => this.toastr.success('', 'Successfully sold order!'));
    }
}
