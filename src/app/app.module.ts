import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ToastrModule } from 'ngx-toastr';

import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { UserModule } from './modules/user/user.module';
import { PaintingModule } from './modules/painting/painting.module';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { CoreModule } from './modules/core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    PaintingModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   autoDismiss: true,
    //   maxOpened: 2,
    //   timeOut: 1500,
    //   easeTime: 200,
    //   newestOnTop: false
    // }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, DataService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
