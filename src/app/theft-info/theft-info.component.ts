import { Component, OnInit, Input } from '@angular/core'
import { Theft } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'theft-info',
  templateUrl: 'theft-info.component.html',
  styleUrls: ['theft-info.component.css'],
})
export class TheftInfoComponent implements OnInit {
  @Input() theft: Theft

  constructor() { }

  ngOnInit() {
  }
}
