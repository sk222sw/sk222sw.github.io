import { Component, OnInit, EventEmitter, Output, Input, ElementRef, KeyValueDiffers, DoCheck } from '@angular/core'
import { TheftService } from '../theft.service'
import { Theft } from '../interfaces'
import { TheftInfoComponent } from '../theft-info'

@Component({
  moduleId: module.id,
  selector: 'theft-list',
  templateUrl: 'theft-list.component.html',
  styleUrls: ['theft-list.component.css'],
  providers: [TheftService],
  directives: [
    TheftInfoComponent,
  ],
})
export class TheftListComponent implements OnInit, DoCheck {
  theftList: Theft[]
  limit = 10
  offset = 0
  show = true
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
  @Input() thefts: Theft[]
  @Output() selectTheft = new EventEmitter()
  @Output() theftFilterChange = new EventEmitter()

  constructor(private theftService: TheftService, private el: ElementRef, private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null)
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.originalThefts.length === 0 && typeof this.thefts === 'object') {
      this.originalThefts = this.thefts
    }
  }

  get theftListCount() { return this.theftList.length }

  handleSelectTheft(event) {
    this.expandTheft(event.id)
    this.selectTheft.emit(event)
  }

  // getTheftList() {
  //   this.theftService.getAll(this.limit, this.offset)
  //     .subscribe(
  //     data => this.setTheftList(data),
  //     error => this.errorMessage = <any>error
  //     )
  // }

  // setTheftList(data: any): void {
  //   this.show = true
  //   this.originalThefts = data.thefts
  //   this.theftList = data.thefts
  // }

  // nextPage() {
  //   if (this.theftListCount < 10) return

  //   this.offset += this.limit
  //   this.getTheftList()
  // }

  // previousPage() {
  //   if (this.theftListCount === 0) return

  //   this.offset -= this.limit
  //   this.getTheftList()
  // }

  handleError(err: any) {
    console.error(err)
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

  filterByTag(event) {
    const {name} = event
    const filteredThefts = []
    for (let theft of this.originalThefts) {
      for (let tag of theft.tags) {
        if (tag.name === name) filteredThefts.push(theft)
      }
    }
    this.filter = name
    this.thefts = filteredThefts
    this.theftFilterChange.emit(this.thefts)
  }

  removeFilter() {
    this.thefts = this.originalThefts
    this.searchValue = ''
    this.filter = 'all'
    this.theftFilterChange.emit(this.thefts)
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
    this.theftFilterChange.emit(this.thefts)
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

}
