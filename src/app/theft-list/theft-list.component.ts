import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { TheftService } from '../theft.service'
import { Theft, Position } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'theft-list',
  templateUrl: 'theft-list.component.html',
  styleUrls: ['theft-list.component.css'],
  providers: [TheftService],
})
export class TheftListComponent implements OnInit {
  theftList: Theft[]
  limit = 10
  offset = 0
  show = false
  @Output() selectTheft = new EventEmitter()

  constructor(private theftService: TheftService) { }

  getAllThings() {
    this.theftService.getAll()
      .subscribe(
        data => this.logData('get all:', data),
        error => this.errorMessage = <any>error
    )

    this.theftService.getById(32)
      .subscribe(
          data => this.logData('by id:', data),
          error => this.errorMessage = <any>error
    )

    this.theftService.getByDescription('bensin')
      .subscribe(
          data => this.logData('by description:', data),
          error => this.errorMessage = <any>error
    )

    this.theftService.getNear({latitude: 56, longitude: 16} as Position)
      .subscribe(
          data => this.logData('by position:', data),
          error => this.errorMessage = <any>error
      )

    const latitude = Math.floor(Math.random() * 50) + 1
    const longitude = Math.floor(Math.random() * 50) + 1

    const theft = {
      theft: {
        description: 'inget',
        time: '2002-12-02',
        latitude,
        longitude,
        tags: [
          { name: 'äpple' },
          { name: 'mat' },
          { name: 'dator' },
        ],
      },
    }

    this.theftService.create(theft)
      .subscribe(
          data => this.logData('create:', data),
          error => this.errorMessage = <any>error
      )

    const id = 34
    this.theftService.update(theft, id)
      .subscribe(
          data => this.logData('update:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.delete(33)
      .subscribe(
          data => this.logData('delete:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getTagsByTheftId(5)
      .subscribe(
          data => this.logData('tag by theft:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getAllTags()
      .subscribe(
          data => this.logData('all tags:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getTagById(5)
      .subscribe(
          data => this.logData('tag by id:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getTheftsByTagId(5)
      .subscribe(
          data => this.logData('thefts by tag:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getAllPositions()
      .subscribe(
          data => this.logData('all positions:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getPositionById(48)
      .subscribe(
          data => this.logData('position by id:', data),
          error => this.errorMessage = <any>error
      )

    this.theftService.getPositionByTheftId(5)
      .subscribe(
          data => this.logData('position by theft:', data),
          error => this.errorMessage = <any>error
      )


  }

  ngOnInit() {
    this.getTheftList()
  }

  get theftListCount() { return this.theftList.length }

  handleSelectTheft(event) {
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
    console.log(err)
  }

  logData(from: string, data: any) {
    console.log(from, data)
  }

}
