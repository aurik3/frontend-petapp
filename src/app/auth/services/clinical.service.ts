import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicalService {
  private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );
  constructor() { }


  getHistorial():Observable<any> {
    const url = `${ this.baseUrl}/clinical`;
    let token = localStorage?.getItem('token') || '';
    console.log(token)
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.get(url, {headers})
    .pipe(
      map((response) => {
        console.log(response);
        return response
      }),
      catchError((err) =>{    
        console.log(err);  
        return err;
      }) 
    )
  }
}
