import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { LogInComponent } from './log-in'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    LogInComponent],
})
export class AppComponent {
  title = 'app works!'
}
