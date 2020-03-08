import { ConnectionService } from 'ng-connection-service';
import { RoleGuardService } from './guards/role-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { ReviewerReviewComponent } from './reviewer-review/reviewer-review.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUpdateUserComponent } from '../app/add-update-user/add-update-user.component'
import { ServicesService } from './services.service';
import { from } from 'rxjs';

import { LoginComponent } from './login/login.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';

import { ReviewerQaerComponent } from './reviewer-qaer/reviewer-qaer.component';
import { ReviewNavbarComponent } from './review-navbar/review-navbar.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewTableComponent } from './review-table/review-table.component'
import { SelfReviewComponent } from './self-review/self-review.component';
import { UpdatePersonalInfoComponent } from './update-personal-info/update-personal-info.component';


import { CreateReviewComponent } from './create-review/create-review.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ErrorPageComponent } from './error-page/error-page.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdminCrudComponent,
    AddUpdateUserComponent,
    ReviewerReviewComponent,
    AddUserComponent,
    AdminOptionsComponent,
    ReviewerQaerComponent,
    CreateReviewComponent,
    ReviewNavbarComponent,
    MyReviewsComponent,
    ReviewTableComponent,
    SelfReviewComponent,
    ActionBarComponent,
    AdminHeaderComponent,
    AdminMainComponent,

    UpdatePersonalInfoComponent,
    ErrorPageComponent,
    //ReactiveFormsModule

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    //ReactiveFormsModule,
    ConnectionService
  ],
  providers: [ServicesService, AuthGuardService, RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
