import { Component, OnInit, Input } from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'flash',
  templateUrl: 'flash.component.html',
  styleUrls: ['flash.component.css'],
})
export class FlashComponent implements OnInit {
  @Input() error: string
  @Input() success: string

  constructor() { }

  setError(message: string) {
    this.error = message
  }

  ngOnInit() {
  }

}
