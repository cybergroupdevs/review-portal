import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { AddUserComponent} from './add-user/add-user.component'
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "admin", component:AdminCrudComponent},
  {path: "user", component: AddUpdateUserComponent},
  {path: "addUser", component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[AdminCrudComponent]
