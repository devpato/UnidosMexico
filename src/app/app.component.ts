import { Component, OnInit, ViewChild, ElementRef, NgZone, Renderer } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { LocationsService } from './shared/locations.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
@Component({
  selector: 'app-root',
  styles: [`
  agm-map {
    height: 300px;
    width: 100%;
  }
`],
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
  lat : number;
  lng : number;
  postion : any
  flag = false;
  zoom : number = 6;
  idValue : string = "";
  infoLocation : any;
  modalName : string = "";
  modalAddress : string = "";
  modalNeeds : string = "";
  
  
  @ViewChild('address') private searchElement: ElementRef;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    private locationDB: LocationsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private renderer:Renderer) { }

   /* markerClicked(marker: marker, index: number) {

    }*/

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
    console.log(this.locations);
  }

  ngAfterViewInit() {
    this.autocompleteSearch();
  }

  autocompleteSearch() {
        this.mapsAPILoader.load().then(
      () => {        
         let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types:["address"]});
 
         autocomplete.addListener("place_changed", ()=>{
           this.ngZone.run(()=>{
             let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
             if(place.geometry === undefined || place.geometry === null) {
               return;
             }
             this.lat = place.geometry.location.lat();
             this.lng = place.geometry.location.lng();

           })
         })
      }      
     );
     console.log(this.lat, this.lng)
  }

  add(tempName: string, tempAddress: string,tempNeeds: string) {
    this.userUid = this.auth.userUID(); 
    this.tempLocations = {
        name: tempName,
        address: tempAddress,
        needs: tempNeeds,
        uid: this.userUid,
        lat: this.lat,
        long: this.lng,
        id:this.lat+""+this.lng
      }     
      this.locations.push(this.tempLocations);
      if(this.flag == true) {
        this.remove(this.postion);
        this.flag = false;
      }
      this.infoLocation = this.tempLocations;
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
    this.lng = 0;
    this.lat = 0;
  }

  getPosition(tempPostion: string) {
    return tempPostion;
  }

  update(location: string, tempName: string, tempAddress: string, tempNeeds: string, tempUid: string, tempLat: number, tempLong: number, tempId:string, postion: string) {
    this.nameValue = tempName;
    this.addressValue = tempAddress;
    this.needsValue = tempNeeds; 
    this.userUid = tempUid;
    this.lat = tempLat;
    this.lng =tempLong;
    this.idValue = tempId;
    this.flag = true;
    this.postion  = postion; 
  }
  @ViewChild('modalInfo') private infoModal: ElementRef;
  information(info) {
    this.infoLocation = {
      name: info.name,
      address: info.address,
      needs: info.needs,
      uid: info.userUid,
      lat: info.lat,
      long: info.lng,
      id: info.lat+""+info.lng
    }     
    this.modalName = '<p">'+info.name+'</p>';
    this.modalAddress = '<p">'+info.address+'</p>';
    this.modalNeeds = '<p">'+info.needs+'</p>';
  }

}


