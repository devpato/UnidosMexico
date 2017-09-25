import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  constructor(public afAuth: AngularFireAuth,private db: AngularFireDatabase) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log(user.displayName);
        console.log(user.uid);
      } else {
        this.currentUser = null;
      }
    });   
  }

  get (): FirebaseListObservable<any[]>{
    return this.db.list('/users');
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  isLoggedIn() {
    if(this.currentUser == null) {
      return false;
    }
    return true;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  userUID(){
    return this.currentUser.uid;
  }
}
