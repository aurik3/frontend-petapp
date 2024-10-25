import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );
  constructor() { }


  getPets():Observable<any> {
    const url = `${ this.baseUrl}/pets`;
    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.get(url, {headers})
    .pipe(
      map((response) => {
       
        return response
      }),
      catchError((err) =>{    
       
        return err;
      }) 
    )
  }
  getPetById(id:number):Observable<any> {
    const url = `${ this.baseUrl}/pets/${id}`;
    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.get(url, {headers})
    .pipe(
      map((response) => {
       
        return response
      }),
      catchError((err) =>{    
     
        return err;
      })
    )
  }

  createPet(name: string, breed: string, age: number, weight: number):Observable<any> {
    const url = `${ this.baseUrl}/pets/create`;
    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.post(url, {name, breed, age, weight}, {headers})
    .pipe(
      map((response) => {
       
        return response
      }),
      catchError((err) =>{    
       
        return err;
      }) 
    )
  }

  updatePet(id:number, name: string, breed: string, age: number, weight: number):Observable<any> {
    const url = `${ this.baseUrl}/pets/update/${id}`;
    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.put(url, {name, breed, age, weight}, {headers})
    .pipe(
      map((response) => {
       
        return response
      }),
      catchError((err) =>{    
       
        return err;
      }) 
    )
  }

  deletePet(id:number):Observable<any> {
    const url = `${ this.baseUrl}/pets/delete/${id}`;
    let token = localStorage?.getItem('token') || '';
    if(!token) return of(false);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    return this.http.delete(url, {headers})
    .pipe(
      map((response) => {
       
        return response
      }),
      catchError((err) =>{    
        
        return err;
      })
    )
  }   
}
