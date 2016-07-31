import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../user.service'

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  providers: [UserService],
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  doLogout() {
    this.userService.logout()
    this.router.navigate([''])
  }

  ngOnInit() {
  }

}
