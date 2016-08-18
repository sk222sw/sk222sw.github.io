import { Component, OnInit, ElementRef } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { LogInComponent } from './log-in'
import { MapCmpComponent } from './map-cmp'
import { TheftListComponent } from './theft-list'
import { TheftInfoComponent } from './theft-info'
import { Theft } from './interfaces/'
import { TheftService } from './theft.service'
import { CreateTheftComponent } from './create-theft'

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
    CreateTheftComponent,
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
  zoom: number = 1
  currentTheftCoordinates: number[] = []
  message = 'snackbar'
  showSnackbar = false

  constructor(private theftService: TheftService, private el: ElementRef) {
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
    this.zoom = 3
    this.mapThefts = event
  }

  theftDeleted(theft) {
    this.theftList = this.theftList.filter(t => t.id !== theft.id)
    this.mapThefts = this.theftList.filter(t => t.id !== theft.id)
    this.snackbar('Theft deleted')
  }

  theftCreated(theft: Theft) {
    this.theftList.unshift(theft)
    this.mapThefts.unshift(theft)
    this.snackbar('Theft created')
  }

  snackbar(message: string) {
    const snackbar = this.el.nativeElement.querySelector('.snackbar')
    snackbar.classList.add('higher-snackbar')
    this.message = message
    this.showSnackbar = true
    setTimeout(() => {
      snackbar.classList.remove('higher-snackbar')
      this.showSnackbar = false
    }, 2500)
  }

}
