import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Chat } from './pages/chat/chat';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'chat', component: Chat },
  { path: '**', redirectTo: 'login' }
];
