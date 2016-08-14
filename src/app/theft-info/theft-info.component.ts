import { Component, OnInit, Input } from '@angular/core'
import { Theft, Position, Tag } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'theft-info',
  templateUrl: 'theft-info.component.html',
  styleUrls: ['theft-info.component.css']
})
export class TheftInfoComponent implements OnInit {
  @Input() theft: any

  constructor() { }

  ngDoCheck() {

  }

  ngOnInit() {
    console.log("this.theft", this.theft)
  }
}
