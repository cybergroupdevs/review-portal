import { ActionBarComponent } from './action-bar/action-bar.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewNavbarComponent } from './review-navbar/review-navbar.component';
import { SelfReviewComponent } from './self-review/self-review.component';
import { ReviewerReviewComponent } from './reviewer-review/reviewer-review.component';
import { ReviewerQaerComponent } from './reviewer-qaer/reviewer-qaer.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { AddUserComponent} from './add-user/add-user.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "employees", component:AdminCrudComponent},
  {path: "user", component: AddUpdateUserComponent},
  {path: "admin", component: AdminOptionsComponent},
  {path: "addUser", component: AddUserComponent},
  {path: "reviewerqaer", component: ReviewerQaerComponent},
  {path: "nav", component: ReviewNavbarComponent},
  {path: "review", component: ReviewerReviewComponent},
  {path: "selfReview", component:SelfReviewComponent},
  {path: "createReview", component:CreateReviewComponent},
  {path: "actionBar", component:ActionBarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents=[AdminCrudComponent]
