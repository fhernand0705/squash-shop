import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  successMsg;
  errorMsg;

  constructor(private authService: AuthService) { }

  registerUser(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.successMsg = "Your account has been created!"
      }, err => {
        console.log(err);
        this.errorMsg = err.message;
      })
  }
}
