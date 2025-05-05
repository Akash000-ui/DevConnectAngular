import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularToSpringServiceService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:2525/api/v1/'; 

  registerUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}user/register`, user);
  }

  loginUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, user);
  }

  registerGoogleUser(user : any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/register/google`, user);
  }

  loginGoogleUser(user : any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login/google`, user);
  }

  getPosts(): Observable<any> {
    const token = localStorage.getItem('jwt');
    console.log("Token In The Angular"+token);
    return this.http.get(`${this.baseUrl}user/posts` , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }     
    );
  }

  addPost(post: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post("http://localhost:2525/api/v1/posts/add", post , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  addLike(likeDetails: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post(`${this.baseUrl}likes/like`, likeDetails , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  addDislike(dislikeDetails: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post(`${this.baseUrl}dislikes/dislike`, dislikeDetails , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}
