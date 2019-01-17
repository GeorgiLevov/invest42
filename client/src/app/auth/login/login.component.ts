import { LoginService } from './../services/login.service';
import { AuthService } from './../../../../../server/src/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthHomeService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MzToastService } from 'ngx-materialize';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public date: Date = new Date();

  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  public genericErrorMsg = 'The field is required!';
  public genMinLengthMsg = 'Min length should be more than 8 chars!';
  public emailErrMsg = 'Invalid email! Eg. john.doe@gmail.com!';
  public genMaxLengthMsg = 'Max length should be less than 50 chars!';

  // tslint:disable-next-line:max-line-length
  public emailPattern = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

  loading = false;
  submitted = false;
  returnUrl: string;

  isLoggedIn: Observable<boolean>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private toastService: ToastrService,

  ) { }


  ngOnInit() {
    this.buildLoginForm();
  }


  public buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': [null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.pattern(this.emailPattern),
        ]
        )],
      'password': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)]
        )],
    });
  }

  successToast() {
    this.toastService.success('', 'Login successfull!', { timeOut: 1000 });
  }

  errToast(err) {
    this.toastService.error('', 'Wrong credentials!', { timeOut: 1000 });
  }


  public login(): void {

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loginService.login(user, { observe: 'response', responseType: 'json' }).subscribe((data: {
      message: string,
      token: string,
    }) => {
      localStorage.setItem('token', data.token);
      this.successToast();

      // this.router.navigate(['./../../admin/home/homeA.component']);
    }, (err: HttpErrorResponse) => {
      this.errToast(err.message);
    });
    this.loginForm.reset();
  }


}
