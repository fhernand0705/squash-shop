import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    authService.user$.subscribe(user => {
      if (!user) return;
        userService.saveUser(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
        localStorage.removeItem('returnUrl')
        router.navigateByUrl(returnUrl);
    })
  }
}
