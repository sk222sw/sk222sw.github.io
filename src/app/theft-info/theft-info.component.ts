import { Component, Input, ViewChild } from '@angular/core'
import { Theft } from '../interfaces'
import { TheftService } from '../theft.service'

@Component({
  moduleId: module.id,
  selector: 'theft-info',
  templateUrl: 'theft-info.component.html',
  styleUrls: ['theft-info.component.css'],
  providers: [TheftService],
})
export class TheftInfoComponent {
  @Input() theft: Theft
  editDescription = false

  // @ViewChild('descriptionInput') descriptionInput

  constructor(private theftService: TheftService) { }

  editClick(field: any) {
    switch (field) {
      case 'description':
        this.editDescription = true
        break
      default:
        break
    }
  }

  save() {
    console.log(this.theft)
    // if ()
    this.editDescription = false
  }

}
