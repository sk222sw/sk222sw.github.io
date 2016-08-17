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
  providers: [TheftService],
})
export class AppComponent implements OnInit {
  title = 'Bike Theft Auto'
  description: ''
  theft = {} as Theft
  theftList: Theft[]
  mapThefts: Theft[]
  showList = true
  currentTheftCoordinates: number[] = []

  constructor(private theftService: TheftService) {
  }

  ngOnInit() {
    this.theftService.getAll()
      .subscribe(
        data => {
          this.theftList = data['thefts']
          this.mapThefts = this.theftList
          this.showList = true
        },
        error => {
          console.error('error')
        }
      )
  }

  selectTheft(event: Theft) {
    this.currentTheftCoordinates = [event.position.latitude, event.position.longitude]
    this.theft = event
  }

  handleFilterChange(event) {
    this.mapThefts = event
  }

}
