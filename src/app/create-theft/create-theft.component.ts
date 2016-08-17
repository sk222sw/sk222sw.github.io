import { Component } from '@angular/core'
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
  tags: Tag[] = []

  constructor(private theftService: TheftService) { }

  onSubmit() {
    console.log(this.date)
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
          console.log("data", data)
        }, error => {
          console.error("errir", error)
        }
      )
  }

  formValid() {
    // const date = this.date.spli('-')
    return this.description !== '' && Number(this.latitude) && Number(this.longitude)
  }

}
