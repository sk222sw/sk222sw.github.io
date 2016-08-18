import { Component, Output, EventEmitter, ElementRef } from '@angular/core'
import { TheftService } from '../theft.service'
import { Theft, Tag } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'create-theft',
  templateUrl: 'create-theft.component.html',
  styleUrls: ['create-theft.component.css'],
  providers: [
    TheftService,
  ],
})
export class CreateTheftComponent {
  description = ''
  date: any
  latitude: number
  longitude: number
  tags = []
  show = false
  @Output() theftCreated = new EventEmitter()

  constructor(private theftService: TheftService, private el: ElementRef) { }

  createTags() {
    const tagString = this.el.nativeElement.querySelector('.tag-input').value
    const tags = tagString.split(',')
    const tagList = []
    if (!tags.length || tags[0] === '') return
    tags.forEach(tag => {
      tagList.push({name: tag})
    })
    this.tags = tagList
  }

  onSubmit(event) {

    this.createTags()

    const theft = {
      description: this.description,
      time: this.date,
      position: {
        latitude: this.latitude,
        longitude: this.longitude,
      },
      tags: this.tags,
    }
    this.theftService.create(theft)
      .subscribe(
        data => {
          this.theftCreated.emit(data['theft'])
          this.closeForm()
          this.description = ''
          this.date = ''
          this.latitude = null
          this.longitude = null
          this.el.nativeElement.querySelector('.tag-input').value = null
        }, error => {
          console.error("errir", error)
        }
      )
  }

  formValid() {
    return (
      this.description !== ''
      && Number(this.latitude)
      && Number(this.longitude)
      && this.date != null)
  }

  closeForm() {
    this.show = false
  }

  showForm() {
    this.show = true
  }

}
