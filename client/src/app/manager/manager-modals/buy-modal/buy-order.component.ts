import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-buy-order',
    templateUrl: './buy-order.component.html',
    styleUrls: ['./buy-order.component.css']
})
export class BuyOrderComponent {

    constructor(
        public dialogRef: MatDialogRef<BuyOrderComponent>,
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
        // console.log(this.data);
        this.managerService.buyStocks(this.data).subscribe(
            data => this.toastr.success('', 'Successfully buy stocks!'));
    }
}
