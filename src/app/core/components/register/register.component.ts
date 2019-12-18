import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  successMsg;
  errorMsg;
  registerForm;


  constructor(
    private authService: AuthService,
    private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl()
    })
  }

  registerUser(value: User) {
    this.authService.registerUser(value)
      .then(res => {
        this.successMsg = "Your account has been created!"
      }, err => {
        console.log(err);
        this.errorMsg = err.message;
      })

    this.router.navigate(['/']);
  }
}
