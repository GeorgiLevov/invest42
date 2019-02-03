
import { AdminService } from './../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserRegisterData } from '../../../shared/models/user-register.model';

@Component({
    selector: 'app-add-manager',
    templateUrl: './add-manager.component.html',
    styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

    public managerForm: FormGroup;

    public genericErrorMsg = 'The field is required!';
    public genMinLengthMsg = 'Min length should be more than 8 chars!';
    public emailErrMsg = 'Not a valid email';
    public passErrMsg = 'Password must have Capitol, lowercase, number and special characters';
    public genMaxLengthMsg = 'Max length should be less than 50 chars!';

    constructor(
        public dialogRef: MatDialogRef<AddManagerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserRegisterData,
        private toastService: ToastrService,
        public adminService: AdminService,
        private fb: FormBuilder,
    ) { }


    ngOnInit() {
        this.buildTheForm();
    }

    successToast() {
        this.toastService.success('', 'Manager added!', { timeOut: 1000 });
    }

    errToast() {
        this.toastService.error('Please try again', 'Wrong input!', { timeOut: 1500 });
    }

    getErrorMessage() {
        return this.managerForm.controls['email'].hasError('required') ? this.genericErrorMsg :
            this.managerForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
                this.managerForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
                    this.managerForm.controls['email'].hasError('pattern') ? this.emailErrMsg :
                        this.managerForm.controls['password'].hasError('minlength') ? this.genMinLengthMsg :
                            this.managerForm.controls['password'].hasError('maxlength') ? this.genMaxLengthMsg :
                                this.managerForm.controls['password'].hasError('required') ? this.genericErrorMsg :
                                    this.managerForm.controls['fullname'].hasError('required') ? this.genericErrorMsg :
                                        this.managerForm.controls['role'].hasError('required') ? this.genericErrorMsg :
                                            '';
    }

    get formData() {
        return this.managerForm.value;
    }

    public buildTheForm() {
        this.managerForm = this.fb.group({
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
            ]),
            role: this.fb.control('MANAGER', Validators.required),
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    public confirmAdd(addManagerData): void {
        console.log(addManagerData);
        this.adminService.addUser(addManagerData).subscribe((result) => {
            this.successToast(),
                this.dialogRef.close(result);
        },
            () => this.errToast(),
        );
    }
}
