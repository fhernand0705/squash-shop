import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
    .pipe(map((appUser: AppUser) => appUser.isAdmin))
  }
}
