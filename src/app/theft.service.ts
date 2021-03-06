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

  private baseUrl = 'https://bike-theft.herokuapp.com/api/'
  private theftUrl = this.baseUrl + 'thefts/'
  private tagUrl = `${this.baseUrl}tags/`
  private positionUrl = `${this.baseUrl}positions/`

  data: any

  constructor(private http: Http, private user: UserService) {
  }

  getTheftList() {
    return this.getAll()
  }

  getHeaders() {
    const headers = new Headers()
    const jwt = localStorage.getItem('auth_token')
    headers.append('Content-Type', this.contentType)
    headers.append('API-key', this.apiKey)
    headers.append('Authorization', `Bearer ${jwt}`)
    return headers
  }

  private extractData(res: Response) {
    let body = res.json()
    return body || { }
  }

  doGet(url: string, headers: Headers): Observable<Response> {
    return this.http.get(url, {headers})
  }

  doPost(url: string, body: any, headers: Headers): Observable<Response> {
    return this.http.post(url, body, {headers})
  }

  formatTheft(theft: Theft) {
    return {
      theft: {
        description: theft.description,
        time: theft.time,
        latitude: theft.position.latitude,
        longitude: theft.position.longitude,
        tags: theft.tags,
      },
    }
  }

  formatCreateTheft(theft: Theft) {
    return {
      theft: {
        description: theft.description,
        time: theft.time,
        latitude: theft.position.latitude,
        longitude: theft.position.longitude,
        tags: theft.tags,
      },
    }
  }

  getAll(limit = 1000, offset = 0): Observable<Theft[]> {
    if (this.data) return Observable.of(this.extractData(this.data))
    return this.doGet(`${this.theftUrl}?limit=${limit}&offset=${offset}`, this.getHeaders())
      .map(data => {
        this.data = data
        return this.extractData(data)
      })
      .catch(this.errorHandler)
  }

  getById(id: number): Observable<Theft> {
    return this.doGet(`${this.theftUrl}${id}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getByDescription(description: string): Observable<Theft[]> {
    const url = `${this.theftUrl}?description=${description}&limit=1000`
    return this.doGet(url, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getNear(latitude: number, longitude: number): Observable<Theft[]> {
    const url = `${this.theftUrl}?thefts_near=${latitude},${longitude}`
    return this.doGet(url, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  create(theft: any): Observable<Theft>  {
    theft = this.formatCreateTheft(theft)
    return this.doPost(this.theftUrl, theft, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  delete(id: number): Observable<Response> {
    return this.http.delete(`${this.theftUrl}${id}`, {headers: this.getHeaders()})
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  update(theft: Theft, id: number): Observable<Theft> {
    const formatedTheft = this.formatTheft(theft)
    return this.http.put(`${this.theftUrl}${id}`, formatedTheft, {headers: this.getHeaders()})
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getTagsByTheftId(id: number): Observable<Tag[]> {
    return this.doGet(`${this.theftUrl}${id}/tags`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getAllTags(): Observable<Tag[]> {
    return this.doGet(`${this.tagUrl}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getTagById(id: number): Observable<Tag> {
    return this.doGet(`${this.tagUrl}${id}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getTheftsByTagId(id: number): Observable<Theft[]> {
    return this.getAll()
  }

  getAllPositions(): Observable<Position[]> {
    return this.doGet(this.positionUrl, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getPositionById(id: number): Observable<Position> {
    return this.doGet(`${this.positionUrl}${id}`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  getPositionByTheftId(id: number): Observable<Position> {
    return this.doGet(`${this.theftUrl}${id}/positions`, this.getHeaders())
      .map(this.extractData)
      .catch(this.errorHandler)
  }

  errorHandler(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    return Observable.throw(errMsg)
  }
}
