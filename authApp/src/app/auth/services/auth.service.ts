import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${environment.baseUrl}/auth`;
  private _user!: User;

  get user(): User {
    return {...this._user};
  }

  constructor( private _http: HttpClient ) { }

  private _general = (url: string, body: {}) => {
    return this._http.post<AuthResponse>(url, body)
     .pipe(
        tap( res => {
          if (res.ok) {
            localStorage.setItem('token', res.token!)
            this._user = {
              uid: res.uid!,
              name: res.name!,
              email: res.email!
            };
          }
        }),
        map( res => res.ok),
        catchError( err => of(err.error.msg) )
      )
  }

  /* Parámetro rest
  register = (...args: string[]) => {
    const url = `${this.baseUrl}/new`
    const [name, email, password] = args
    const body = {
      name,
      email,
      password
    }
    return this._general(url, body)
  }*/

  register(name: string, email: string, password: string) {
    const url = `${ this.baseUrl }/new`;
    const body = { name, email, password }
    return this._general(url, body);
  }

  login( email: string, password: string ) {
    const url = `${ this.baseUrl }/login`;
    const body = { email , password };

    return this._general(url, body);
  }

  validarToken = (): Observable<boolean> => {
    const url = `${ this.baseUrl }/renew`;
    const headers = new HttpHeaders()
      .set('x-auth-token', localStorage.getItem('token') ?? '')
    return this._http.get<AuthResponse>(url, { headers })
     .pipe(
        map( res => {
            localStorage.setItem('token', res.newToken!);
            this._user = {
              uid: res.uid!,
              name: res.name!,
              email: res.email!
            }
            return res.ok;
        }),
        catchError( err => of(false) )
      );
  }

  logout = (): void => localStorage.clear()

}
