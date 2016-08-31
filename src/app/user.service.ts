import { Injectable, EventEmitter } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  private loggedIn = false
  private contentTypeJSON: string = 'application/json'
  private apiKey: string = 'Z-QJ43o-1yrXmb_NRFJCtQ'
  private headers = new Headers()
  private authUrl: string = 'https://bike-theft.herokuapp.com/knock/auth_token'
  public loggedIn$: EventEmitter<any> = new EventEmitter()
  // public itemAdded$: EventEmitter<TodoItem>;

  constructor(private http: Http) {
    if (localStorage.getItem('auth_token') == null) {
      this.setLoggedIn(false)
      console.log("is NOT logged in")
    } else {
      this.setLoggedIn(true)
      console.log("is already logged in")
    }
  }


  getHeaders() {
    this.headers.append('Content-Type', this.contentTypeJSON)
    this.headers.append('API-key', this.apiKey)
    return this.headers
  }

  login(email: string, password: string) {
    const body = {auth: {email, password}}
    return this.doPost(this.authUrl, this.getHeaders(), body)
  }

  doPost(url: string, headers: Headers, body: any) {
    return this.http.post(url, body, {headers})
  }

  loginSuccess(jwt) {
    this.setLoggedIn(true)
    this.loggedIn = true
    console.log("about to emit")
    this.loggedIn$.next({login: true})
    localStorage.setItem('auth_token', jwt)
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.setLoggedIn(false)
  }

  getEvent() {
    return this.loggedIn$
  }

  setLoggedIn(status: boolean) {
    this.loggedIn = status
  }

  isLoggedIn() {
    if (localStorage.getItem('auth_token') == null) {
      return false
    }

    return this.loggedIn
  }

}
