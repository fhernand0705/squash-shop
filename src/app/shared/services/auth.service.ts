import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from 'src/app/shared/models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  loginGoogle() {
    this.returnToUrl();
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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

  registerUser(value: AppUser) {
    this.returnToUrl();

    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(
        String(value.email), String(value.password)
      ).then(user => {
        resolve(firebase.auth().onAuthStateChanged(user => {
          if (user)
            user.updateProfile({
              displayName: value.name
            })
        }))
        }, err => reject(err))
    })
  }

  loginUser(user: AppUser) {
    this.returnToUrl();

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(
        String(user.email), String(user.password)
      ).then(user => {
        resolve(firebase.auth().onAuthStateChanged(user => {
          if (user) return user;
        }))
      }, err => {
        reject(err);
        console.log(err);
      })
    })
  }

  private returnToUrl() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }
}
