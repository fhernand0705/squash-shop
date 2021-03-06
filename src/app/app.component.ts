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
    this.authService.user$.subscribe(user => {
      if (!user) return;
        this.userService.saveUser(user);

      this.returnToUrl();
    })
  }

  private returnToUrl() {
    let returnUrl = localStorage.getItem('returnUrl');
    if (!returnUrl) return;
      localStorage.removeItem('returnUrl')
      this.router.navigateByUrl(returnUrl);
  }
}
