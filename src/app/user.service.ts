import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  private loggedIn = false
  private contentTypeJSON: string = 'application/json'
  private apiKey: string = 'Z-QJ43o-1yrXmb_NRFJCtQ'
  private headers = new Headers()
  private authUrl: string = 'https://bike-theft.herokuapp.com/knock/auth_token'

  constructor(private http: Http) {
    if (localStorage.getItem('auth_token') == null) {
      this.setLoggedIn(false)
    } else {
      this.setLoggedIn(true)
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
    localStorage.setItem('auth_token', jwt)
    this.setLoggedIn(true)
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.setLoggedIn(false)
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
