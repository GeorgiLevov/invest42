import { Subscription } from 'rxjs';
import { AdminService } from './../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClientRegisterData } from '../../../shared/models/client-register.model';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit, OnDestroy {

    public clientForm: FormGroup;

    public genericErrorMsg = 'The field is required!';
    public genMinLengthMsg = 'Min length should be more than 8 chars!';
    public emailErrMsg = 'Not a valid email';
    public passwordPattern = ('([A-Za-z0-9@#$%&*]+)$');
    public genMaxLengthMsg = 'Max length should be less than 50 chars!';

    private subscription: Subscription;

    constructor(
        public dialogRef: MatDialogRef<AddClientComponent>,
        private toastService: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: ClientRegisterData,
        public adminService: AdminService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.buildTheForm();
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }

    successToast() {
        this.toastService.success('', 'Client added!', { timeOut: 1500 });
    }

    errToast() {
        this.toastService.error('Please try again', 'Wrong input!', { timeOut: 1500 });
    }

    getErrorMessage() {
        return this.clientForm.controls['email'].hasError('required') ? this.genericErrorMsg :
            this.clientForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
                this.clientForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
                    this.clientForm.controls['email'].hasError('pattern') ? this.emailErrMsg :
                        this.clientForm.controls['address'].hasError('required') ? this.genericErrorMsg :
                            this.clientForm.controls['fullname'].hasError('required') ? this.genericErrorMsg :
                                this.clientForm.controls['age'].hasError('required') ? this.genericErrorMsg :
                                    this.clientForm.controls['availableBalance'].hasError('required') ? this.genericErrorMsg : '';
    }

    get formData() {
        return this.clientForm.value;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    public buildTheForm() {
        this.clientForm = this.fb.group({
            fullname: this.fb.control('', Validators.required),
            address: this.fb.control('', Validators.required),
            email: this.fb.control('', [
                Validators.required,
                Validators.email,
                Validators.minLength(10),
                Validators.maxLength(50),
            ]),
            age: this.fb.control('', Validators.required),
            availableBalance: this.fb.control('', Validators.required),
        });
    }

    public confirmAdd(addClientFormData): void {
        this.adminService.addClient(addClientFormData).subscribe((result) => {
            this.successToast(),
                this.dialogRef.close(result);
        },
            () => this.errToast(),
        );
    }
}
