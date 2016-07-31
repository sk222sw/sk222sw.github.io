import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../user.service'
import { User } from '../models/user'
import { FlashComponent } from '../flash'

@Component({
  moduleId: module.id,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  providers: [UserService],
  directives: [
    FlashComponent,
  ],
})
export class LogInComponent implements OnInit {
  model = new User('', '')
  name: string
  @Output() flashMessage = new EventEmitter()
  private errorMessage: string

  constructor(
    private userService: UserService,
    private router: Router) { }

  onSubmit() {
    const { email, password } = this.model

    this.userService.login
      (email, password)
      .map(res => res.text())
      .subscribe(
        data => {
          const {jwt} = JSON.parse(data)
          this.userService.loginSuccess(jwt)
          this.router.navigate([''])
        },
        err => {
          this.errorMessage = 'Login failed'
        }
      )

  }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.model) }

}
