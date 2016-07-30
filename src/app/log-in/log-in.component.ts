import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { User } from '../models/user'

@Component({
  moduleId: module.id,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  providers: [UserService]
})
export class LogInComponent implements OnInit {

  model = new User('', '')
  name: string

  constructor(
    private userService: UserService,
    private router: Router)
  { }

  onSubmit() {
    const { email, password } = this.model

    console.log(email, password)

    this.userService.getThefts()

    // this.userService.login(email, password)
    //   .subscribe(result => {
    //     if (result) {
    //       this.router.navigate(['']);
    //     }
    //   });
  }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
