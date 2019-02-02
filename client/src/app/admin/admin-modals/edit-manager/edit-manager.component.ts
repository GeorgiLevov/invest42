import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-manager',
    templateUrl: './edit-manager.component.html',
    styleUrls: ['./edit-manager.component.css']
})
export class EditManagerComponent implements OnInit {

    public editManagerForm: FormGroup;

    public genericErrorMsg = 'The field is required!';
    public emailErrMsg = 'Not a valid email';
    public passErrMsg = 'Password must have Capitol, lowercase, number and special characters';
    public passwordPattern = ('([A-Za-z0-9@#$%&*]+)$');
    public genMaxLengthMsg = 'Max length should be less than 50 chars!';
    public genMinLengthMsg = 'Min length should be more than 8 chars!';

    constructor(
        public dialogRef: MatDialogRef<EditManagerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public adminService: AdminService,
        private toastService: ToastrService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.buildTheForm();
    }

    successToast() {
        this.toastService.success('', 'Admin added!', { timeOut: 1000 });
    }

    errToast() {
        this.toastService.error('Please try again', 'Wrong input!', { timeOut: 1500 });
    }

    getErrorMessage() {
        return this.editManagerForm.controls['email'].hasError('required') ? this.genericErrorMsg :
            this.editManagerForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
                this.editManagerForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
                    this.editManagerForm.controls['email'].hasError('pattern') ? this.emailErrMsg :
                        this.editManagerForm.controls['password'].hasError('minlength') ? this.genMinLengthMsg :
                            this.editManagerForm.controls['password'].hasError('maxlength') ? this.genMaxLengthMsg :
                                this.editManagerForm.controls['password'].hasError('required') ? this.genericErrorMsg :
                                    this.editManagerForm.controls['password'].hasError('pattern') ? this.passErrMsg : '';
    }

    public buildTheForm() {
        this.editManagerForm = this.fb.group({
            email: this.fb.control('', [
                Validators.required,
                Validators.email,
                Validators.minLength(10),
                Validators.maxLength(50),
            ]),
            password: this.fb.control('', [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Validators.pattern(this.passwordPattern)]),
        });
    }

    get formData() {
        return this.editManagerForm.value;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {
        this.adminService.updateUser(this.data).subscribe((data) => {
            this.successToast();
        },
            (err: HttpErrorResponse) => {
                this.errToast();
            });
    }
}
