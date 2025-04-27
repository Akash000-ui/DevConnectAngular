import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularToSpringServiceService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/v1/'; 

  registerUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user);
  }

  loginUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}login`, user);
  }

}
