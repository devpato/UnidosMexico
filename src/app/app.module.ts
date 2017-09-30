import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';
import { LocationsService} from './shared/locations.service';
import { CommonModule } from '@angular/common'; 
import {AgmCoreModule} from '@agm/core'; 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase, 'letslearn-dev'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBk_0evGpzOANxC1yS-Xk_2951TB9FzVrs",
      libraries: ["places"]
    })
  ],
  providers: [AuthService, LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
