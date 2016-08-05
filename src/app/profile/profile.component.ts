import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../user.service'
import { TheftService } from '../theft.service'

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  providers: [UserService, TheftService],
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private theftService: TheftService) {
  }

  doLogout() {
    this.userService.logout()
    this.router.navigate([''])
  }

  ngOnInit() {
    this.theftService.getAll()
  }

}
