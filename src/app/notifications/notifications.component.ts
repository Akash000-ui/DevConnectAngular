import { Component } from '@angular/core';
import { WebSocketServiceService } from '../web-socket-service.service';
import { Subscription } from 'rxjs';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';



@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: any[] = [];
  currentUserId: number = parseInt(localStorage.getItem('userId')!); 

  private subscription: Subscription = new Subscription();

   constructor(private serverListner : WebSocketServiceService , private server : AngularToSpringServiceService){   

   }

    mode: 'light' | 'dark' = 'light';

   ngOnInit() {
    // this.serverListner.connect(this.currentUserId);
    // this.subscription.add(
    //   this.serverListner.notifications$.subscribe((notification) => {
    //     console.log('Notification received:', notification);
    //     this.notifications.unshift(notification);
    //   })
    // );
    const savedMode = localStorage.getItem('mode');
    this.mode = savedMode === 'dark' ? 'dark' : 'light';
    this.getUnreadNotifications();
  }

  private formatTimestamp(createdAt: string | undefined): string {
    if (!createdAt) return 'Just now';
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  }


  getUnreadNotifications() {
    this.server.getUnreadNotifications(this.currentUserId).subscribe((res) => {
      this.notifications = res.unreadNotifications;
      console.log('Unread notifications:', this.notifications);
    },
    (error) => {
      console.error('Error fetching unread notifications:', error); 
  });
}
}
