import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginForm: FormGroup;
  successMsg: string;
  errorMsg: any;

  constructor(
    private router: Router,
    private authService: AuthService) {

      this.createForm();
    }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginUser(user) {
    this.authService.loginUser(user)
    .then(res => {
      this.successMsg = "You have successfully logged!"
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.errorMsg = err.message;
    })
  }

}
