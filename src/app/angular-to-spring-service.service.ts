import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularToSpringServiceService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:2525/api/v1/user/'; 

  registerUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user);
  }

  loginUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}login`, user);
  }

  registerGoogleUser(user : any): Observable<any> {
    return this.http.post(`${this.baseUrl}register/google`, user);
  }

  loginGoogleUser(user : any): Observable<any> {
    return this.http.post(`${this.baseUrl}login/google`, user);
  }

}
