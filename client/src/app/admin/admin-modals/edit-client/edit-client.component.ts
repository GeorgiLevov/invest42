import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

    public editClientForm: FormGroup;

    public genericErrorMsg = 'The field is required!';
    public emailErrMsg = 'Not a valid email';
    public genMaxLengthMsg = 'Max length should be less than 50 chars!';
    public genMinLengthMsg = 'Min length should be more than 8 chars!';

    constructor(
        public dialogRef: MatDialogRef<EditClientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public adminService: AdminService,
        private toastService: ToastrService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.buildTheForm();
    }

    successToast() {
        this.toastService.success('', 'Client edited!', { timeOut: 1000 });
    }

    errToast() {
        this.toastService.error('Please try again', 'Wrong input!', { timeOut: 1500 });
    }

    getErrorMessage() {
        return this.editClientForm.controls['email'].hasError('required') ? this.genericErrorMsg :
            this.editClientForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
                this.editClientForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
                    this.editClientForm.controls['email'].hasError('pattern') ? this.emailErrMsg : '';
    }

    public buildTheForm() {
        this.editClientForm = this.fb.group({
            email: this.fb.control('', [
                Validators.required,
                Validators.email,
                Validators.minLength(10),
                Validators.maxLength(50),
            ]),
        });
    }

    get formData() {
        return this.editClientForm.value;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {
        this.data.newManagerEmail = this.formData;
        this.adminService.updateClient(this.data).subscribe((data) => {
            // this.dialogData = data;
            this.successToast();
        },
            (err: HttpErrorResponse) => {
                this.errToast();
            });
    }
}
