import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CardModule,FormsModule,ReactiveFormsModule,PasswordModule,CommonModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true
})
export class LoginComponent implements OnInit {
  
 showLoginError:boolean=false;
  loginForm:FormGroup;
  constructor(private fb:FormBuilder){
   this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onLogin(loginForm:FormGroup){

  }
}
