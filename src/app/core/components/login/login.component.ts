import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginForm: FormGroup;
  successMsg: string;
  errorMsg: string;

  constructor(
    private router: Router,
    private authService: AuthService
  )
    { this.createForm(); }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginUser(user) {
    this.authService.loginUser(user)
    .then(res => {
      this.successMsg = "You have successfully logged!"

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);

    }, err => {
      console.log(err);
      this.errorMsg = err.message;
    })
  }

}
