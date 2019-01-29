import { UserLogin } from '../../models/user-login.model';
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
import { AuthenticationService } from '../../shared/core/authentication/authentication.service';
import { Role } from '../../../../../server/src/models/enums/roles.enum';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options: FormGroup;
  public loginForm: FormGroup;


  public genericErrorMsg = 'The field is required!';
  public genMinLengthMsg = 'Min length should be more than 8 chars!';
  public emailErrMsg = 'Not a valid email';
  public passErrMsg = 'Password must have one \'capital\' and one small letter.';
  public genMaxLengthMsg = 'Max length should be less than 50 chars!';

  // tslint:disable-next-line:max-line-length

  public passwordPattern = ('([A-Za-z0-9@#$%&*]+)$');

  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastrService,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
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
        ])],
      'password': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(this.passwordPattern)
        ])],
    });
  }

  successToast() {
    this.toastService.success('', 'Login successfull!', { timeOut: 1000 });
  }

  errToast() {
    this.toastService.error('Please try again', 'Wrong credentials!', { timeOut: 1500 });
    this.loginForm.controls['password'].setErrors(null);
  }

  getEmailErrorMessage() {
    return this.loginForm.controls['email'].hasError('required') ? this.genericErrorMsg :
        this.loginForm.controls['email'].hasError('minlength') ? this.genMinLengthMsg :
        this.loginForm.controls['email'].hasError('maxlength') ? this.genMaxLengthMsg :
        this.loginForm.controls['email'].hasError('pattern') ? this.emailErrMsg :
        '';
  }

  getPassErrorMessage() {
    return this.loginForm.controls['password'].hasError('required') ? this.genericErrorMsg :
        this.loginForm.controls['password'].hasError('minlength') ? this.genMinLengthMsg :
        this.loginForm.controls['password'].hasError('maxlength') ? this.genMaxLengthMsg :
        this.loginForm.controls['password'].hasError('pattern') ? this.passErrMsg :
        '';
  }

  public login(): void {

    this.loading = true;

    const user: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (!user.email || !user.password) {
      this.errToast();
      this.loginForm.reset();
      return;
    }

    this.loginService.login(user, { observe: 'response', responseType: 'json' })
      .subscribe((data: { message: string, token: string }) => {
        localStorage.setItem('token', data.token);

        this.successToast();
        const role = this.authService.getRole();

        if (role === Role.admin) {
          this.router.navigate(['admin']);
          this.loading = false;

        } else if (role === Role.manager) {

          this.router.navigate(['manager']);
          this.loading = false;
        }

      }, (err: HttpErrorResponse) => {
        // console.log('err', err);

        this.errToast();
        this.loginForm.reset();
      });

  }
}
