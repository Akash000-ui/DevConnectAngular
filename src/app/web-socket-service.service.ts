// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';

// import { NotificationModel } from '../notification.model';

// declare let window: any;
// declare let global: any;
// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketServiceService {

//     constructor(private http:HttpClient ) { }

//   private stompClient: any;
//   private notificationSubject = new Subject<any>();

//   notifications$ = this.notificationSubject.asObservable();

//   async connect( userId:number): Promise<void> {
//   if (typeof window === 'undefined') {
//     return; // SSR safety: exit early
//   }

//   try {
//     console.log('Connecting to WebSocket...');
//     console.log('User ID:', userId);
//     const stompjs = await import('stompjs');
//     console.log('StompJS imported:', stompjs);
//     const sockjs = await import('sockjs-client');
//     console.log('SockJS imported:', sockjs);

//     const socket = new sockjs.default('http://localhost:2525/ws'); // or your backend URL
//     this.stompClient = stompjs.over(socket);
//     console.log('Socket created:', socket);
//     this.stompClient.connect( {'user-id': userId}, (frame: any) => {
//       console.log('Connected:', frame);
//     });
//   } catch (err) {
//     console.error('WebSocket connection failed:', err);
//   }
// }

//   disconnect() {
//     if (this.stompClient) {
//       this.stompClient.disconnect();  
//     }
//   }
// }


// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
 // connect(userId: number){

  //   if (typeof window === 'undefined') {
  //     console.warn('WebSocket not available during SSR.');
  //     return;
  //   }
    

  //   import('stompjs').then((stompjs) => {
  //     const SockJS = (window as any).SockJS || require('sockjs-client');
  //     const socket = new SockJS('http://localhost:2525/ws');

  //     this.stompClient = stompjs.over(socket);
  //   this.stompClient.connect({ 'user-id': userId.toString() }, () => {
  //     this.stompClient.subscribe(`/user/topic/notifications`, (message: any) => {
  //       if (message.body) {
  //         console.log('Received message:', message.body);
  //         const notification : NotificationModel = JSON.parse(message.body);
  //         this.notificationSubject.next(notification);
  //       }
  //     });
  //   });

  //   })

  // }


  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { NotificationModel } from '../notification.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

    constructor(private http:HttpClient ) { }

  private stompClient: any;
  private notificationSubject = new Subject<any>();

  notifications$ = this.notificationSubject.asObservable();

  connect(userId: number){
    const socket = new SockJS('http://localhost:2525/ws');

    console.log('User ID:', userId);
    console.log('Connecting to WebSocket...');
    console.log('Socket created:', socket);
    this.stompClient = Stomp.over(socket);
    console.log('StompJS created:', this.stompClient);
    this.stompClient.connect({ 'user-id': userId.toString() }, () => {
      this.stompClient.subscribe(`/user/topic/notifications`, (message: any) => {
        if (message.body) {
          console.log('Received message:', message.body);
          const notification : NotificationModel = JSON.parse(message.body);
          this.notificationSubject.next(notification);
        }
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();  
    }
  }
}
