import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { Theft, Tag } from '../interfaces'
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
  @Output() selectTag = new EventEmitter()
  @Output() changeTitle = new EventEmitter()
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
    this.theftService.update(this.theft, this.theft.id)
      .subscribe(
        data => {
          if (data['error']) this.errorHandler(data['error'])
          this.theft = data['theft']
          this.changeTitle.emit(this.theft)
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

  getTheftsByTag(tag: Tag) {
    this.selectTag.emit(tag)
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1
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
