import { Component, OnInit, Input } from '@angular/core'
import { GOOGLE_MAPS_PROVIDERS, GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core'

import { Marker, Theft } from '../interfaces'

@Component({
  moduleId: module.id,
  selector: 'map-cmp',
  templateUrl: 'map-cmp.component.html',
  styleUrls: ['map-cmp.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
})
export class MapCmpComponent implements OnInit {
  private lat: number = 56
  private lon: number = 15

  @Input() thefts: Theft[]

  constructor() { }

  getLat = () => this.lat
  getLon = () => this.lon

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
      content: 'Bla bla blabla',
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
      content: 'muuuuu,',
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true,
      content: 'sjldfsdjfkj',
    },
  ]
  ngOnInit() {
  }

}
