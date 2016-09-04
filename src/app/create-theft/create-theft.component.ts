import { Component, Output, EventEmitter, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
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
  tagList: string[]
  @Output() theftCreated = new EventEmitter()

  constructor(
    private theftService: TheftService,
    private el: ElementRef,
    private router: Router) { }

  createTags() {
    const tagString = this.el.nativeElement.querySelector('.tag-input').value
    const tags = tagString.split(',')
    const tagList = []
    if (!tags.length || tags[0] === '') return
    tags.forEach(tag => {
      tagList.push(tag)
    })
    this.tagList = tagList
    this.tags = tagList
    this.tags = this.tags.map(tag => {return <Tag>{name: tag}})
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
          console.log('data', data)
          this.router.navigate(['/', 'thefts', data['theft'].id])
        }, error => {
          console.error("errir", error)
        }
      )
  }

  formValid() {
    return (
         this.description !== ''
      && this.description.match(/^[A-Za-zÅÄÖåäö ]+$/)
      && Number(this.latitude)
      && Number(this.longitude)
      && this.date != null)
  }

  closeForm() {
    this.router.navigate(['/', 'thefts'])
  }

}
