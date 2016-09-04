import { Component, OnInit, ElementRef, DoCheck } from '@angular/core'
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router'
import { LogInComponent } from './log-in'
import { MapCmpComponent } from './map-cmp'
import { TheftListComponent } from './theft-list'
import { TheftInfoComponent } from './theft-info'
import { Theft } from './interfaces/'
import { TheftService } from './theft.service'
import { CreateTheftComponent } from './create-theft'
import { UserService } from './user.service'
import { LoggedInGuard } from './logged-in.guard'
import { Broadcaster } from './broadcaster'

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
  providers: [TheftService, UserService],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Bike Theft Auto'
  description: ''
  theft = {} as Theft
  theftList: Theft[]
  showList = true
  zoom: number = 1
  currentTheftCoordinates: number[] = []
  message = 'snackbar'
  showSnackbar = false
  loggedIn: boolean
  subscription: any

  constructor(
    private theftService: TheftService,
    private el: ElementRef,
    private user: UserService,
    private route: ActivatedRoute,
    private guard: LoggedInGuard,
    private broadcaster: Broadcaster) {
  }

  ngDoCheck() {
    if (this.loggedIn !== this.guard.canActivate()) {
      this.loggedIn = this.guard.canActivate()
      if (this.loggedIn) {
        this.snackbar('Hi there!')
      }
    }
  }

  ngOnInit() {
    this.loggedIn = this.user.isLoggedIn()
    this.createListeners()
  }

  createListeners() {
    this.subscription = this.broadcaster.on<string>('AllThefts')
      .subscribe(message => {
        this.theftList = message as any
      })
    this.broadcaster.on<string>('TheftInfo')
      .subscribe(data => {
        this.selectTheft(data as any)
      })
    this.broadcaster.on<string>('Message')
      .subscribe(data => {
        this.snackbar(data)
      })
  }


  selectTheft(event: Theft) {
    this.currentTheftCoordinates = [event.position.latitude, event.position.longitude]
    this.theft = event
  }

  handleFilterChange(event) {
    this.zoom = 3
    // this.mapThefts = event
  }

  theftDeleted(theft) {
    this.theftList = this.theftList.filter(t => t.id !== theft.id)
    this.snackbar('Theft deleted')
  }

  theftCreated(theft: Theft) {
    this.theftList.unshift(theft)
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

  logOut() {
    this.user.logout()
    this.loggedIn = false
    this.snackbar('See ya!')
  }

}
