import { Component, Input, ViewChild, ElementRef } from '@angular/core'
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
  @ViewChild('tagInput') tagInput: ElementRef
  originalTheft: Theft
  editing = false
  showError = false
  error: string
  addingTag = false

  constructor(private theftService: TheftService) {}

  edit(event) {
    this.originalTheft = JSON.parse(JSON.stringify(this.theft))
    this.editing = true
  }

  save() {
    // this.theft.position.address = '...'
    this.theftService.update(this.theft, this.theft.id)
      .subscribe(
        data => {
          if (data['error']) this.errorHandler(data['error'])
          this.theftService.getPositionByTheftId(this.theft.id)
            .subscribe(
              data => {
                this.theft.position.address = data['position'].address
              }
            )
        },
        error => {this.errorHandler(error)}
      )
    this.editing = false
  }

  errorHandler(error) {
    this.theft = JSON.parse(JSON.stringify(this.originalTheft))
    this.showError = true
    this.error = error
  }

  addTag() {
    this.addingTag = true
  }

  saveTag() {
    const newTag = this.tagInput.nativeElement.value
    this.addingTag = false
    this.theft.tags.push({name: newTag} as any)

    this.save()

  }

  deleteTag(selectedTag) {
    this.theft.tags = this.theft.tags.filter(tag => tag.id !== selectedTag.id)
  }

  cancel() {
    this.theft = JSON.parse(JSON.stringify(this.originalTheft))
    this.editing = false
  }

}
