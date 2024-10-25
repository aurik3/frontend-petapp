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
  createHistorial(id_pet: number,description: string):Observable<boolean> {

    const url = `${ this.baseUrl}/clinical/create`;
    let token = localStorage?.getItem('token') || '';
    console.log(token)
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`)
    ;

    return this.http.post(url, {id_pet,description}, {headers})
    .pipe(
      map((response) => {       
        return true
      }),
      catchError((err) =>{    
       return of(false);
      })

    )
    
}

updateHistorial(id:number, id_pet: number,description: string):Observable<any> {
  const url = `${ this.baseUrl}/clinical/update/${id}`;
  let token = localStorage?.getItem('token') || '';
  if(!token) return of(false);
  const headers = new HttpHeaders()
  .set('Authorization',`Bearer ${token}`);
  return this.http.put(url, {id_pet,description}, {headers})
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

deleteHistorial(id:number):Observable<any> {
  const url = `${ this.baseUrl}/clinical/delete/${id}`;
  let token = localStorage?.getItem('token') || '';
  if(!token) return of(false);
  const headers = new HttpHeaders()
  .set('Authorization',`Bearer ${token}`);
  return this.http.delete(url, {headers})
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
