import { Injectable } from '@angular/core'
import { Theft, Position, Tag } from './interfaces'
import { Http, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Rx'
import 'rxjs/Rx'
import { UserService } from './user.service'

@Injectable()
export class TheftService {
  private contentType: string = 'application/json'
  private apiKey = 'Z-QJ43o-1yrXmb_NRFJCtQ'
  private jwt: 'string'

  private baseUrl = 'https://bike-theft.herokuapp.com/api/'
  private theftUrl = this.baseUrl + 'thefts/'

  constructor(private http: Http, private user: UserService) {
  }

  getHeaders() {
    const headers = new Headers()
    headers.append('Content-Type', this.contentType)
    headers.append('API-key', this.apiKey)

    if (this.user.isLoggedIn()) {
      const jwt = localStorage.getItem('auth_token')
      headers.append('Authorization', `Bearer ${jwt}`)
    }
    return headers
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  doGet(url: string, headers: Headers) {
    return this.http.get(url, {headers})
  }

  doPost(url: string, body: any, headers: Headers) {
    return this.http.post(url, body, {headers})
  }

  getAll(limit = 10, offset = 0): Observable<Theft[]> {
    return this.doGet(this.theftUrl, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getById(id: number): Observable<Theft> {
    return this.doGet(`${this.theftUrl}${id}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getByDescription(description: string): Observable<Theft[]> {
    return this.doGet(`${this.theftUrl}?${description}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getNear(position: Position): Observable<Theft[]> {
    const url = `${this.theftUrl}?thefts_near=${position.latitude},${position.longitude}`
    return this.doGet(url, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  create(theft: any): Observable<Theft>  {
    console.log(this.getHeaders())
    return this.doPost(this.theftUrl, theft, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)

  }

  deleteById(id: number) {}

  update(theft: any, id: number): Observable<Theft> {
    return this.http.put(`${this.theftUrl}${id}`, theft, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getTagsByTheftId(id: number) {}
  getAllTags() {}
  getTagById(id: number) {}
  getTheftsByTag(tag: Tag) {}
  getCreators() {}
  getCreatorById(id: number) {}
  getAllPositions() {}
  getPositionById(id: number) {}
  getTheftPosition(theftId: number) {}

  errorHandler(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg)
    return Observable.throw(errMsg);
  }
}
