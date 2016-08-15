import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { LogInComponent } from './log-in'
import { MapCmpComponent } from './map-cmp'
import { TheftListComponent } from './theft-list'
import { TheftInfoComponent } from './theft-info'
import { Theft } from './interfaces/'
import { TheftService } from './theft.service'

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
  providers: [TheftService]
})
export class AppComponent implements OnInit {
  title = 'Bike Theft Auto'
  description: ''
  theft = {} as Theft
  theftList: Theft[]
  showList = true

  constructor(private theftService: TheftService) {
  }

  ngOnInit() {
    this.theftService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.theftList = data['thefts']
          this.showList = true
        },
        error => {
          console.log("error")
        }
      )
  }

  selectTag(event) {
    const name = event.name
    const thefts = []
    for (let theft of this.theftList) {
      for (let tag of theft.tags) {
        if (tag.name === name) thefts.push(theft)
      }
    }
    this.theftList = thefts
  }

  selectTheft(event) {
    this.theft = event.theft || event
  }

}
