import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  successMsg;
  errorMsg;
  registerForm: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router) {

    this.createForm();
  }

  private createForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  registerUser(user: AppUser): any {
    this.authService.registerUser(user)
      .then(res => {
        this.successMsg = "Your account has been created!"
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.errorMsg = err.message;
      })
  }
}
