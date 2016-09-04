import { provideRouter, RouterConfig } from '@angular/router'
import { LogInComponent } from './log-in'
import { ProfileComponent } from './profile'
import { LoggedInGuard } from './logged-in.guard'
import { TheftListComponent } from './theft-list/theft-list.component'
import { EditTheftComponent } from './edit-theft/edit-theft.component'
import { CreateTheftComponent } from './create-theft/create-theft.component'

const routes: RouterConfig = [
  { path: '', component: TheftListComponent, terminal: true },
  { path: 'login', component: LogInComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'thefts', component: TheftListComponent },
  { path: 'thefts/create', component: CreateTheftComponent, canActivate: [LoggedInGuard] },
  { path: 'thefts/:id', component: TheftListComponent },
  { path: 'thefts/:id/edit', component: EditTheftComponent, canActivate: [LoggedInGuard] },
  { path: 'tags/:id', component: TheftListComponent },
  { path: 'search/:string', component: TheftListComponent },
]

export const appRouterProviders = [
  provideRouter(routes),
]
