import { AdminService } from './../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserRegisterData } from '../../../shared/models/user-register.model';
import { Subscribable, Subscription } from 'rxjs';

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.css']
})

export class AddAdminComponent implements OnInit, OnDestroy {

    public adminForm: FormGroup;

    public genericErrorMsg = 'The field is required!';
    public genMinLengthMsg = 'Min length should be more than 8 chars!';
    public emailErrMsg = 'Not a valid email';
    public passErrMsg = 'Password must have Capitol, lowercase, number and special characters';
    public passwordPattern = ('([A-Za-z0-9@#$%&*]+)$');
    public genMaxLengthMsg = 'Max length should be less than 50 chars!';

    private subscripton: Subscription;

    constructor(
        public dialogRef: MatDialogRef<AddAdminComponent>,
        private toastService: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: UserRegisterData,
        public adminService: AdminService,
        private fb: FormBuilder,
    ) { }


    ngOnInit() {
        this.buildTheForm();
    }

    ngOnDestroy(): void {
    //   this.subscripton.unsubscribe();
    }

    successToast() {
        this.toastService.success('', 'Admin added!', { timeOut: 1000 });
    }

    errToast() {
        this.toastService.error('Please try again', 'Wrong input!', { timeOut: 1500 });
    }

    getErrorMessage() {
        return this.adminForm.controls['email'].hasError('required') ? this.genericErrorMsg :
            this.adminForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
                this.adminForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
                    this.adminForm.controls['email'].hasError('pattern') ? this.emailErrMsg :
                        this.adminForm.controls['password'].hasError('minlength') ? this.genMinLengthMsg :
                            this.adminForm.controls['password'].hasError('maxlength') ? this.genMaxLengthMsg :
                                this.adminForm.controls['password'].hasError('pattern') ? this.passErrMsg :
                                    this.adminForm.controls['password'].hasError('required') ? this.genericErrorMsg :
                                        this.adminForm.controls['fullname'].hasError('required') ? this.genericErrorMsg :
                                            this.adminForm.controls['role'].hasError('required') ? this.genericErrorMsg : '';
    }

    get formData() {
        return this.adminForm.value;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    public buildTheForm() {
        this.adminForm = this.fb.group({
            fullname: this.fb.control('', Validators.required),
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
            role: this.fb.control('ADMIN', Validators.required),
        });
    }

    public confirmAdd(addAdminData): void {
        this.adminService.addUser(addAdminData).subscribe((result) => {
            this.successToast(),
                this.dialogRef.close(result);
        },
            () => this.errToast(),
        );
    }


}
