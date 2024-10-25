import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );
  constructor() { }

  createUser(name: string, username: string, email: string, password: string): Observable<boolean> {
    const url = `${ this.baseUrl}/users/create`;
    const body = {name, username,email, password };

    return this.http.post(url, body)
    .pipe(
      map((response) => {
        console.log(response);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    )
  }
}
