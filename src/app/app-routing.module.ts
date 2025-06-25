import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculatriceComponent } from './components/calculatrice/calculatrice.component';
import { authGuard } from './core/auth.guard';

/* path: lien saisi dans la barre de navigation
   component: le composant relie a ce path
*/
const routes: Routes = [
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'profile', component:ProfileComponent
  },
  {
    path: 'sign-up', component:SignUpComponent
  },
  {
    path: 'to-do', component:ToDoComponent
  },
  {
    path: 'utilisateurs', component:UtilisateursComponent
  },
  {
    path: 'to-do/details/:id', component:TodoDetailsComponent
  },
  {
    path: 'todo-table', component:TodoTableComponent
  },
  {
    path: '', component:DashboardComponent, canActivate:[authGuard]
  },
  {
    path: 'calculatrice', component:CalculatriceComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
