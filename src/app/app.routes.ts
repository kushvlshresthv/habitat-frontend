import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { isNotAuthenticated } from './app.guards';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { CreateHabitComponent } from './create-habit/create-habit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [isNotAuthenticated],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create-todo',
    component: CreateTodoComponent,
  },
  {
    path: 'create-habit',
    component: CreateHabitComponent,
  }
];
