import { Component } from '@angular/core';
import { TestComponent } from './test';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LogInComponent } from './log-in';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    TestComponent,
    LogInComponent],
})
export class AppComponent {
  title = 'app works!';
}
