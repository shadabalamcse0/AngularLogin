import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';  
import { AuthService } from '../services/auth'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule,CommonModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        await this.auth.login(this.loginForm.value);   // ✅ backend login
        this.router.navigateByUrl('/home', { replaceUrl: true });  // ✅ navigate to home
      } catch {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }
}
