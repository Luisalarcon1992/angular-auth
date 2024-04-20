import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ILoginResponse, IUser, AuthStatus, ICheckAuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject( HttpClient );

  private _currentUser = signal< IUser | null > (null);
  private _authStatus = signal< AuthStatus > (AuthStatus.cheking);


  // Al hacer esto, no exponemos el valor de _currentUser directamente, sino que lo hacemos a través de la propiedad computada currentUser.
  // Es decir, nadie podrá cambiar el valor del currentUser, solamente el servicio es quién tiene el poder de hacerlo.
  // Solo exponemos lo que el servicio tiene al momento de la petición.
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login( email: string, password: string) : Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<ILoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError( err.error.message))


      )
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;

    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ICheckAuthResponse>(url, { headers }).pipe(
      map( ({ user, token }) => this.setAuthentication(user, token) ),
      catchError(() => {
        this._authStatus.set(AuthStatus.unauthenticated);
        return of(false)})
    );
  }

  private setAuthentication(user: IUser, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
    localStorage.removeItem('token');
    localStorage.removeItem('redirectUrl');
  }
}
