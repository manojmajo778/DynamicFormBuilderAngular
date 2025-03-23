import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  
  // Dropdown options for roles
  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' }
  ];


  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}

  // constructor() {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     console.log('Login Data:', this.loginForm.value);
  //   }
  // }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username,this.loginForm.value.role.value);
      console.log('Login Data:', this.loginForm.value);
    }
  }

}
