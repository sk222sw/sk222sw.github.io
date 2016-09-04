import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, ROUTER_DIRECTIVES, Router } from '@angular/router'
import { TheftService } from '../theft.service'
import { Theft } from '../interfaces'
import { TheftInfoComponent } from '../theft-info'
import { Broadcaster } from '../broadcaster'

@Component({
  moduleId: module.id,
  selector: 'theft-list',
  templateUrl: 'theft-list.component.html',
  styleUrls: ['theft-list.component.css'],
  providers: [TheftService],
  directives: [
    TheftInfoComponent,
    ROUTER_DIRECTIVES,
  ],
})
export class TheftListComponent implements OnInit {
  limit = 1000
  offset = 0
  showList: boolean
  theftInfo: Theft
  theftElements: Element[]
  showingInfo = false
  filter = 'all'
  searchValue: string
  latitudeValue: any
  longitudeValue: any
  showFilters = false
  showSearchByDescription = false
  showSearchByPosition = false
  thefts: Theft[]

  constructor(
    private theftService: TheftService,
    private route: ActivatedRoute,
    private broadcaster: Broadcaster,
    private router: Router) {
  }

  theftSelected(theft) {
    this.router.navigate(['/', 'thefts', theft.id])
    this.broadcaster.broadcast('AllThefts', [theft])
  }

  searchByPositionToggle() {
    this.showSearchByPosition = !this.showSearchByPosition
    this.showSearchByDescription = false
  }

  searchByDescriptionToggle() {
    this.showSearchByDescription = !this.showSearchByDescription
    this.showSearchByPosition = false
  }

  ngOnInit() {
    let id
    let search

    this.route.params.forEach((params: Params) => {
      search = params['string']
      id = +params['id']
    })

    if (this.route.snapshot.url.some(u => u.path === 'search')) {
      this.search(search)
    } else if (this.route.snapshot.url.some(u => u.path === 'tags')) {
      this.showTheftsByTag(id)
    } else {
        if (Number(id)) {
          this.theftService.getById(id)
            .subscribe(data => this.gotTheftInfo(data))
          this.showList = false
        } else {
          this.getTheftList()
          this.showList = true
        }
    }
  }

  showTheftsByTag(id) {
    let list
    this.theftService.getAll(1000, 0)
      .subscribe(data => {
        list = data['thefts'].filter(t => t.tags.some(tag => tag.id === id))
        this.showList = true
        this.thefts = list
        this.theftService.getTagById(id)
          .subscribe(
            d => {
              this.filter = d['tag'].name
            }
          )
        this.broadcaster.broadcast('AllThefts', this.thefts)
      })
  }

  gotTheftInfo(data) {
    const {theft} = data
    this.theftInfo = theft
    this.broadcaster.broadcast('TheftInfo', theft)
  }

  getTheftList() {
    this.theftService.getAll(this.limit, this.offset)
      .subscribe(
        data => this.setTheftList(data),
        error => {
          this.broadcaster.broadcast('Message', 'There was an error getting thefts.')
        }
      )
  }

  setTheftList(data: any): void {
    this.broadcaster.broadcast('AllThefts', data.thefts)
    this.thefts = data.thefts
  }

  removeFilter() {
    this.router.navigate(['/', 'thefts'])
    this.searchValue = ''
    this.filter = null
    this.getTheftList()
  }

  searchString(value) {
    return ['/', 'search', `${value}`]
  }

  search(event) {
    const searchString = this.searchValue || event
    this.theftService.getByDescription(searchString)
      .subscribe(
        data => this.handleSearch(data, searchString),
        error => {
          this.broadcaster.broadcast('Message', 'Search failed.')
        }
      )
  }

  handleSearch(data: any, searchValue: string) {
    const {thefts} = data
    if (!thefts.length) {
      this.broadcaster.broadcast('Message', 'No thefts were found')
      this.router.navigate(['/', 'thefts'])
      return
    }
    this.filter = searchValue
    this.thefts = thefts
    this.showList = true
    this.broadcaster.broadcast('AllThefts', thefts)
  }

  findNear() {
    this.theftService.getNear(this.latitudeValue, this.longitudeValue)
      .subscribe(
        data => {
          const nearTheftIds = data['thefts']
          const nearThefts: Theft[] = []
          if (typeof nearTheftIds !== 'object') {
            this.broadcaster.broadcast('Message', 'No nearby thefts were found')
            return
          }
          this.thefts.forEach(theft => {
            if (nearTheftIds.indexOf(theft.id) > -1) {
              nearThefts.push(theft)
            }
          })
          this.thefts = nearThefts
          this.broadcaster.broadcast('AllThefts', this.thefts)
          this.filter = `Latitude: ${this.latitudeValue}, Longitude: ${this.longitudeValue}`
        },
        error => {
          this.broadcaster.broadcast('Message', 'Server error. Try again later.')
          return
        }
      )
  }

  findNearFormValid() {
    return !Number(this.latitudeValue) || !Number(this.longitudeValue)
  }


  delete(theft) {
    this.thefts = this.thefts.filter(t => t.id !== theft.id)
    this.theftService.delete(theft.id)
      .subscribe(
        data => {
          this.broadcaster.broadcast('Message', 'Theft deleted!')
        },
        error => {
          this.broadcaster.broadcast('Message', 'Error deleting theft. Try later')
        }
      )
  }
}
