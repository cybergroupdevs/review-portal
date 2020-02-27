import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AddUpdateUserComponent} from '../app/add-update-user/add-update-user.component'
import{ServicesService} from './services.service';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    AddUpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
