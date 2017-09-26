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
  users:  FirebaseListObservable<any[]>;
  title="Unidos Mexico"
  tempLocations : any
  userUid : string
  tempUser : any 
  nameValue : string = ""
  addressValue : string = ""  
  cityValue : string = ""
  stateValue : string = ""
  needsValue : string = "";
  postion : any
  flag = false;

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
 
  userUID(){
    return this.auth.userUID();
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

  add(tempName: string, tempAddress: string,tempCity: string, tempState: string, tempNeeds: string) {
    this.userUid = this.auth.userUID();
    this.tempLocations = {
        name: tempName,
        address: tempAddress,
        city: tempCity,
        state: tempState,
        needs: tempNeeds,
        uid: this.userUid
      }     
      this.locations.push(this.tempLocations);
      if(this.flag == true) {
        this.remove(this.postion);
        this.flag = false;
      }
      this.clearFields()
  }

  remove(location: string) {
    this.locations.remove(location);
  }

  clearFields() {
    this.nameValue = ""
    this.addressValue = ""  
    this.cityValue = ""
    this.stateValue = ""
    this.needsValue = "";
  }

  getPosition(tempPostion: string) {
    return tempPostion;
  }

  update(location: string, tempName: string, tempAddress: string,tempCity: string, tempState: string, tempNeeds: string, postion: string) {
    this.nameValue = tempName;
    this.addressValue = tempAddress;
    this.cityValue = tempCity;
    this.stateValue = tempState;
    this.needsValue = tempNeeds; 
    this.flag = true; 
    this.postion  = postion;

  }
}


