import { Component, OnInit, EventEmitter, Output, Input, ElementRef, KeyValueDiffers, DoCheck } from '@angular/core'
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
export class TheftListComponent implements OnInit, DoCheck {
  theftList: Theft[]
  limit = 10
  offset = 0
  showList: boolean
  theftInfo: Theft
  showTheftInfo = false
  theftElements: Element[]
  expandedTheftId: number
  showingInfo = false
  theftTitles: Element[]
  filter = 'all'
  originalThefts: Theft[] = []
  searchValue: string
  differ: any
  latitudeValue: any
  longitudeValue: any
  errorMessage = ''
  showFilters = false
  showSearchByDescription = false
  showSearchByPosition = false
  thefts: Theft[]
  tagName: string = ''
  showFilter = false

  @Output() selectTheft = new EventEmitter()
  @Output() theftFilterChange = new EventEmitter()
  @Output() theftDeleted = new EventEmitter()

  constructor(
    private theftService: TheftService,
    private el: ElementRef,
    private differs: KeyValueDiffers,
    private route: ActivatedRoute,
    private broadcaster: Broadcaster,
    private router: Router) {
    this.differ = differs.find({}).create(null)
  }

  theftSelected(theft) {
    this.router.navigate(['/', 'thefts', theft.id])
    this.broadcaster.broadcast('AllThefts', [theft])
  }

  filterShow() {
    this.showFilters = true
  }

  filterHide() {
    this.showFilters = false
    this.showSearchByDescription = false
    this.showSearchByPosition = false
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
    this.route.params.forEach((params: Params) => {
      id = +params['id']
    })

    if (this.route.snapshot.url.some(u => u.path === 'tags')) {
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

  ngDoCheck() {
  }

  showTheftsByTag(id) {
    let list
    this.theftService.getAll()
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

  get theftListCount() { return this.theftList.length }

  handleSelectTheft(event) {
    this.expandTheft(event.id)
    this.selectTheft.emit(event)
  }

  getTheftList() {
    this.theftService.getAll(this.limit, this.offset)
      .subscribe(
        data => this.setTheftList(data),
        error => this.errorMessage = <any>error
      )
  }

  setTheftList(data: any): void {
    this.broadcaster.broadcast('AllThefts', data.thefts)
    this.thefts = data.thefts
  }

  handleError(err: any) {
    this.errorMessage = err
  }

  expandTheft(id: number) {
    const theftElements = this.theftElements || this.el.nativeElement.querySelectorAll('.expand-info')
    theftElements.forEach(e => {
      if (e.classList.contains(`id-${id}`)) {
        if (this.expandedTheftId === id) {
          this.showingInfo = true
          e.classList.add('hidden')
          this.expandedTheftId = 0
        } else {
          this.expandedTheftId = id
          e.classList.remove('hidden')
        }
      } else {
        if (!e.classList.contains('hidden')) {
          e.classList.add('hidden')
        }
      }
    })
  }

  handleChangeTitle(event) {
    const {id, description} = event
    const theftTitles = this.theftTitles || this.el.nativeElement.querySelectorAll('.theft-title')
    theftTitles.forEach(e => {
      if (e.classList.contains(`theft-title-${id}`)) {
        e.innerHTML = description
      }
    })
  }

  removeFilter() {
    this.router.navigate(['/', 'thefts'])
    this.searchValue = ''
    this.filter = null
    this.getTheftList()
  }

  search(event) {
    this.theftService.getByDescription(this.searchValue)
      .subscribe(
        data => this.handleSearch(data, this.searchValue),
        error => this.handleError('Server error, try again later.')
      )
  }

  handleSearch(data: any, searchValue: string) {
    const {thefts} = data
    if (!thefts.length) {
      this.handleError('No thefts were found')
      return
    }
    this.filter = searchValue
    this.thefts = thefts
    this.broadcaster.broadcast('AllThefts', thefts)
  }

  findNear() {
    this.theftService.getNear(this.latitudeValue, this.longitudeValue)
      .subscribe(
        data => {

          const nearTheftIds = data['thefts']
          const nearThefts: Theft[] = []
          if (typeof nearTheftIds !== 'object') {
            this.handleError('No nearby thefts found')
            return
          }
          this.originalThefts.forEach(theft => {
            if (nearTheftIds.indexOf(theft.id) > -1) {
              nearThefts.push(theft)
            }
          })
          this.thefts = nearThefts
          this.theftFilterChange.emit(this.thefts)
          this.filter = `Latitude: ${this.latitudeValue}, Longitude: ${this.longitudeValue}`
        },
        error => {
          this.handleError('No nearby thefts found')
          return
        }
      )
  }

  findNearFormValid() {
    return !Number(this.latitudeValue) || !Number(this.longitudeValue)
  }

  handleTheftDeleted(event) {
    this.theftDeleted.emit(event)
  }

}
