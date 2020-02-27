import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {AddUpdateUserComponent} from '../app/add-update-user/add-update-user.component'
import{ServicesService} from './services.service';
import { from } from 'rxjs';


import { LoginComponent } from './login/login.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';

import { AddUserComponent } from './add-user/add-user.component';

import { AdminOptionsComponent } from './admin-options/admin-options.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdminCrudComponent,
    AddUpdateUserComponent,

    AddUserComponent,

    AdminOptionsComponent


  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
