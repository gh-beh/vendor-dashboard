import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumniComponent } from './alumni/alumni.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';

import {
  AgmCoreModule
} from '@agm/core';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {EventsService} from './services/events.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })*/
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
