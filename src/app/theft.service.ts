import { Injectable } from '@angular/core'
import { Theft, Position, Tag } from './interfaces'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TheftService {
  private contentType: string = 'application/json'
  private apiKey = 'Z-QJ43o-1yrXmb_NRFJCtQ'
  private jwt: 'string'

  private baseUrl = 'https://bike-theft.herokuapp.com/api/'
  private theftUrl =  this.baseUrl + 'thefts'

  constructor(private http: Http) { }

  getHeaders() {
    const headers = new Headers()
    headers.append('Content-Type', this.contentType)
    headers.append('API-key', this.apiKey)

    // this.headers.append('Authorization', `Bearer ${this.jwt}`)
    return headers
  }

  doGet(url: string, headers: Headers) {
    return this.http.get(url, {headers})
  }

  getAll(limit = 10, offset = 0) {
    return this.doGet(this.theftUrl, this.getHeaders())
  }

  errorHandler(err: any) {
    console.log('err', err)
  }

  getById(id: number) {}
  getByDescription(description: string) {}
  getNear(position: Position) {}
  create(theft: Theft) {}
  deleteById(id: number) {}
  updateById(id: number) {}
  getTagsByTheftId(id: number) {}
  getAllTags() {}
  getTagById(id: number) {}
  getTheftsByTag(tag: Tag) {}
  getCreators() {}
  getCreatorById(id: number) {}
  getAllPositions() {}
  getPositionById(id: number) {}
  getTheftPosition(theftId: number) {}

}
