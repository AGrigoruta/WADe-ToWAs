import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './dashboard/map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { ModalComponent } from './dashboard/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@NgModule({
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MapComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    DataService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
