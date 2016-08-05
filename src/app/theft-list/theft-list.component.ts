import { Component, OnInit } from '@angular/core';
import { TheftService } from '../theft.service'
import { Theft } from '../interfaces'

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
        data => {
          const body = data.json()
          console.log(body.thefts)
        }
        )
  }

}
