import { Component, OnInit } from '@angular/core';
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

  constructor(private theftService: TheftService) { }

  ngOnInit() {
    this.theftService.getAll()
      .subscribe(
        data => this.logData('get all:', data),
        error => this.errorMessage = <any>error
    )

    this.theftService.getById(5)
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
        description: "bensinstation",
        time: "2002-12-02",
        latitude,
        longitude,
        tags: [
          { name: "katt" },
          { name: "hund" }
        ]
      }
    }
    this.theftService.create(theft)
      .subscribe(
          data => this.logData('create:', data),
          error => this.errorMessage = <any>error
      )

    const id = 5
    this.theftService.update(theft, id)
      .subscribe(
          data => this.logData('update:', data),
          error => this.errorMessage = <any>error
      )
  }



  errorMessage(err: any) {
    console.log(err)
  }

  logData(from: string, data: any) {
    console.log(from, data)
  }

}
