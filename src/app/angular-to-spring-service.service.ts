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

  searchByName(name: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}search/filterByName`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        term: name
      }
    });
  }
  
  searchBySkill(skill: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}search/filterBySkills`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        term: skill
      }
    });
  }
  
  searchByPosts(post: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}search/filterByPosts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        term: post
      }
    });
  }
  
  addComment(comment: any): Observable<any> { 
    const token = localStorage.getItem('jwt');
    return this.http.post(`${this.baseUrl}comments/add`, comment , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getuserDetails(id:number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}getUserDetails/user/`+ id , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUserDetailsProfile(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}getUserDetails/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }


  updatePost(postId: number, post: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.put(`${this.baseUrl}posts/update/${postId}`, post, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.delete(`${this.baseUrl}posts/delete/${postId}`, {
      headers: {
        'Authorization': `Bearer ${token}`    
      }
    });
  }

  updateUserWithImage(userId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.put(`${this.baseUrl}user/update/${userId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

  }

  private apiUrl = 'http://localhost:2525/api/notifications';

  getUnreadNotifications(userId: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.apiUrl}/get-unread-notifications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}