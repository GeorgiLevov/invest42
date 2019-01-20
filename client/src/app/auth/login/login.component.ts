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

  // tslint:disable-next-line:max-line-length
  public emailPattern = ('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
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

    this.loading = true;
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
      const role = this.authService.getRole();


      if (role === Role.admin) {
        this.router.navigate(['admin']);
        this.loading = false;

      } else if (role === Role.manager) {
        this.router.navigate(['manager']);
        this.loading = false;

      }

    }, (err: HttpErrorResponse) => {
      this.errToast(err.message);
    });
    this.loginForm.reset();
  }


}
