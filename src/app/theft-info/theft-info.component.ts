import { Component, Input, ViewChild, ElementRef } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { Theft } from '../interfaces'
import { TheftService } from '../theft.service'

@Component({
  moduleId: module.id,
  selector: 'theft-info',
  templateUrl: 'theft-info.component.html',
  styleUrls: ['theft-info.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
  providers: [TheftService],
})
export class TheftInfoComponent {
  @Input() theft: Theft
  @ViewChild('tagInput') tagInput: ElementRef

  constructor() {}

}
