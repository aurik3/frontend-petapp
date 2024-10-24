import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );
 
  private _currentUser = signal<User | null>( null );
  private _authStatus  = signal<AuthStatus>( AuthStatus.checking );

  public currentUser   = computed( () => this._currentUser() );
  public authStatus    = computed(()=> this._authStatus())

  constructor() {

  
  }

  login(username: string, password: string):Observable<boolean> {

    const url = `${ this.baseUrl}/auth/login`;
    const body = { username, password };
    
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      tap(({data, token}) => {
        this._currentUser.set(data);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);

      }),
      map(() => true),
      catchError(err =>{
        return throwError(()=>err.error.message)
      })
    )
  }

 checkauthStatus():Observable<boolean> {
    const url   = `${ this.baseUrl}/auth/info-user`;

    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);

    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.get<LoginResponse>(url, {headers})
    .pipe(
      map(({data}) => {
        this._currentUser.set(data);
        this._authStatus.set(AuthStatus.authenticated);
        return true;
      }),
      catchError(() =>{
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    )
  }

  verifyAuthStatus():Observable<boolean> {

    if (typeof window !== 'undefined' && !!localStorage.getItem('token')) {
      return of(true);
    }else{
      return of(false);
    }
  }
}
