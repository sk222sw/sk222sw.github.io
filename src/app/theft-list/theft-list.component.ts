import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core'
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
export class TheftListComponent implements OnInit {
  theftList: Theft[]
  limit = 10
  offset = 0
  show = true
  theftInfo: Theft
  showTheftInfo = false
  theftElements: Element[]
  expandedTheftId: number
  showingInfo = false
  @Input() thefts: Theft[]

  constructor(private theftService: TheftService, private el: ElementRef) {

  }

  ngOnInit() {
  }

  get theftListCount() { return this.theftList.length }

  handleSelectTheft(event) {
    // this.selectTheft.emit(event)
    this.expandTheft(event.id)
  }

  getTheftList() {
    this.theftService.getAll(this.limit, this.offset)
      .subscribe(
        data => this.setTheftList(data),
        error => this.errorMessage = <any>error
      )
  }

  setTheftList(data: any): void {
    this.show = true
    this.theftList = data.thefts
  }

  nextPage() {
    if (this.theftListCount < 10) return

    this.offset += this.limit
    this.getTheftList()
  }

  previousPage() {
    if (this.theftListCount === 0) return

    this.offset -= this.limit
    this.getTheftList()
  }

  errorMessage(err: any) {
    console.error(err)
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
    const theftTitles = this.el.nativeElement.querySelectorAll('.theft-title')
    theftTitles.forEach(e => {
      if (e.classList.contains(`theft-title-${id}`)) {
        console.log(id, e)
        e.innerHTML = description
      }
    })
  }

}
