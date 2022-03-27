import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './helpers/auth.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'admin',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate: [AuthGuard],
  }, {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
