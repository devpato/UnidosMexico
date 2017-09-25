import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { LocationsService } from './shared/locations.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = null;
  locations: FirebaseListObservable<any[]>;
  title="Unidos Mexico"
  tempLocations : any
  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    private locationDB: LocationsService) { }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) =>{this.user = user}   
    );
    this.locations = this.locationDB.get(); 
    
  }

  add(tempName: string, tempAddress: string,tempCity: string, tempState: string) {
      this.tempLocations = {
        name: tempName,
        address: tempAddress,
        city: tempCity,
        state: tempState
      }
      console.log(this.tempLocations);
      this.locations.push(this.tempLocations);
      console.log(this.locations);
  }

  remove(location: string) {
    this.locations.remove(location);
  }
}


