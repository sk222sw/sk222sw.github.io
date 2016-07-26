import { provideRouter, RouterConfig } from '@angular/router';
import { LogInComponent } from './log-in';
import { ProfileComponent } from './profile';
import { HomeComponent } from './home';

const routes: RouterConfig = [
  { path: '', component: HomeComponent, terminal: true },
  { path: 'login', component: LogInComponent },
  { path: 'profile', component: ProfileComponent },
];

export const appRouterProviders = [
  provideRouter(routes)  
];