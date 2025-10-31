import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ApiClient } from '../../services/api-client';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent implements OnInit {
  showLoginError: boolean = false;
  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin: boolean = false;
  errorMessage:string='';
  constructor(
    private fb: FormBuilder,
    private api: ApiClient,
    private loader: NgxUiLoaderService,  private zone: NgZone,private router :Router,
    private auth:AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/), // At least one letter and one number
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }
  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirm = formGroup.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
  ngOnInit(): void {
    
  }
  onLogin() {
       
    if(this.loginForm.invalid){
      this.errorMessage='Username or Password is incorrect';
      return;
    }
     const payload = { 
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.api.post('user/login', payload).subscribe({
      next: (res: any) => {
        if(res.status==='success'){
         this.auth.setUserId(res.userId);
         this.auth.setUsername(res.username);
        this.router.navigate(['home']);
        this.auth.setIsAuthenticated(true);
        this.errorMessage = 'User Registered Successfully';
        console.log(this.auth.getUserId());
        console.log(this.auth.getUsername());
        console.log(this.auth.getIsAuthenticated());
        }
      this.loader.stop();
        
      },
      error: (err: any) => {
        this.loader.stop();
      },
    });
  }
 showError(form: FormGroup, fieldName: string): boolean {
  const control = form.get(fieldName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
  onSignup() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }
    const payload = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
    };

    this.loader.start();
    this.api.post('user/signup', payload).subscribe({
      next: (res: any) => {
       
        this.errorMessage = 'User Registered Successfully';
      
      this.loader.stop();
        
      },
      error: (err: any) => {
        this.loader.stop();
      },
    });
  }
}
