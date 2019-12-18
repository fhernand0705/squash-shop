import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  regUser$: User;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    this.currentUrl();
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
        switchMap((user: firebase.User) => {
          if (user) return this.userService.getUser(user.uid);

          return of(null);
      })
  )}

  registerUser(value: User) {
    this.currentUrl();

    var user = null;
  //nullify empty arguments
  for (var i = 0; i < arguments.length; i++) {
    arguments[i] = arguments[i] ? arguments[i] : null;
  }

    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(
        String(value.email), String(value.password)
      ).then(() => {
        user = firebase.auth().currentUser;
        resolve(user.updateProfile({
          displayName: value.name
        }))
      }, err => reject(err))
    })
  }

  getUser(user: firebase.User) {
    if (user != null)
    return firebase.auth().currentUser;
  }

  private currentUrl() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

}
