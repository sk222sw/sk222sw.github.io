import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core'
import { GOOGLE_MAPS_PROVIDERS, GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core'
import { TheftService } from '../theft.service'

import { Marker, Theft } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'map-cmp',
  templateUrl: 'map-cmp.component.html',
  styleUrls: ['map-cmp.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
  providers: [TheftService],
})
export class MapCmpComponent implements OnInit, DoCheck {
  private lat: number = 56
  private lon: number = 15
  private theftMarkers: Marker[] = []
  private showMap = true
  @Input() thefts: Theft[] = []
  @Output() selectTheft = new EventEmitter()
  @Input() coordinates: number[] = []

  constructor(private theftService: TheftService) { }

  getLat = () => this.lat
  getLon = () => this.lon

  ngOnInit() {
  }

  ngDoCheck() {
    if (typeof this.thefts === 'object') {
      this.showMap = true
    }
  }

  addToMarkers(thefts: Theft[]) {
    for (let t of thefts) {
      if (t.position !== null) {
        const marker = {
          theftId: t.id,
          lat: t.position.latitude,
          lng: t.position.longitude,
          label: 'Theft',
          draggable: false,
          content: this.getContentString(t),
        }
        this.theftMarkers.push(marker)
      }
    }
    this.showMap = true
  }

  getContentString(theft: any): string {
    return `Where: ${theft.position.address}
            When: ${theft.time} \r\n
            How: ${theft.description}`
  }

  errorMessage(err: any) {
    console.error(err)
  }

}
