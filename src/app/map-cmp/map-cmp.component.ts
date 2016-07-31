import { Component, OnInit } from '@angular/core';
import { GOOGLE_MAPS_PROVIDERS, GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core'

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
  constructor() { }

  getLat = () => this.lat
  getLon = () => this.lon

  ngOnInit() {
  }

}
