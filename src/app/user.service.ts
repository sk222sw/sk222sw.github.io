import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private loggedIn = false

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  getThefts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('API-key', 'Z-QJ43o-1yrXmb_NRFJCtQ');
    return this.http.get('https://bike-theft.herokuapp.com/api/thefts/', {headers})
      .toPromise()
      .then(res => {
        console.log("res", res)
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('API-key', 'Z-QJ43o-1yrXmb_NRFJCtQ');
    return this.http
      .post(
        'https://bike-theft.herokuapp.com/knock/auth_token',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        console.log("res", res)
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      })
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
