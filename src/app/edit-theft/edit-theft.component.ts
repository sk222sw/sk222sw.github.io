import { Component, OnInit, ElementRef } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Theft, Tag, Position } from '../interfaces'
import { TheftService } from '../theft.service'
import { Broadcaster } from '../broadcaster'

@Component({
  moduleId: module.id,
  selector: 'app-edit-theft',
  templateUrl: 'edit-theft.component.html',
  styleUrls: ['edit-theft.component.css'],
})
export class EditTheftComponent implements OnInit {
  theft: Theft
  description = ''
  date: any
  latitude: number
  longitude: number
  tags = []
  tagNames = []
  loading = true
  id: number

  constructor(
    private theftService: TheftService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private router: Router,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params['id']
    })

    if (Number(this.id)) {
      this.theftService.getById(this.id)
        .subscribe(
        data => this.gotTheftInfo(data),
        error => {
          this.broadcaster.broadcast('Message', 'Error getting theft. Try later.')
        }
      )}
  }

  gotTheftInfo(data) {
    this.loading = false
    this.theft = data.theft
    this.description = this.theft.description
    this.date = this.theft.time
    this.latitude = this.theft.position.latitude
    this.longitude = this.theft.position.longitude
    data.theft.tags.forEach(t => {
      this.tags.push(t)
      this.tagNames.push(t.name)
    })
  }

  formValid() {
    return (
      this.description !== ''
      && Number(this.latitude)
      && Number(this.longitude)
      && this.date != null)
  }

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

  onSubmit(e) {
    this.createTags()

    this.theft = <Theft>{
      description: this.description,
      time: this.date,
      position: {
        latitude: this.latitude,
        longitude: this.longitude,
      },
      tags: this.tags,
    }

    this.theftService.update(this.theft, this.id)
      .subscribe(
        data => {
          this.broadcaster.broadcast('Message', 'Theft updated!')
          this.router.navigate(['/', 'thefts', `${this.id}`])
        },
        error => {
          this.broadcaster.broadcast('Message', 'Error updating theft. Try later.')
        }
      )
  }
}
