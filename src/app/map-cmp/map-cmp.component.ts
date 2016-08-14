import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core'
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
export class MapCmpComponent implements OnInit {
  private lat: number = 56
  private lon: number = 15
  private theftMarkers: Marker[] = []
  private showMap = false
  @Input() thefts: Theft[]
  @Output() selectTheft = new EventEmitter()

  constructor(private theftService: TheftService) { }

  getLat = () => this.lat
  getLon = () => this.lon

  clickedMarker(label: any, index: number) {
    this.theftService.getById(label.theftId)
      .subscribe(
        data => {
          this.selectTheft.emit(data)
        }
      )
    // console.log(`clicked the marker: ${label.content || index}`)
  }

  ngOnInit() {
    this.getAllThefts()
  }

  getAllThefts() {
    this.theftService.getAll(100, 0)
      .subscribe(
        data => this.addToMarkers(data),
        error => this.errorMessage = <any>error
      )
  }

  addToMarkers(data: any) {
    const thefts = data.thefts
    console.log(thefts[0])
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
    console.log(err)
  }

}

// markers: Marker[] = [
//   {
//     lat: 51.673858,
//     lng: 7.815982,
//     label: 'A',
//     draggable: true,
//     content: 'Bla bla blabla',
//   },
//   {
//     lat: 51.373858,
//     lng: 7.215982,
//     label: 'B',
//     draggable: false,
//     content: 'muuuuu,',
//   },
//   {
//     lat: 51.723858,
//     lng: 7.895982,
//     label: 'C',
//     draggable: true,
//     content: 'sjldfsdjfkj',
//   },