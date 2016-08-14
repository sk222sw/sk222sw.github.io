import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { LogInComponent } from './log-in'
import { MapCmpComponent } from './map-cmp'
import { TheftListComponent } from './theft-list'
import { TheftInfoComponent } from './theft-info'
import { Theft } from './interfaces/'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    LogInComponent,
    MapCmpComponent,
    TheftListComponent,
    TheftInfoComponent,
  ],
})
export class AppComponent {
  title = 'Bike Theft Auto'
  description: ''
  theft = {} as Theft

  selectTheft(event) {
    this.theft = event.theft || event
  }

}
