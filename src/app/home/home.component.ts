import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from '../web-socket-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUserId: number = parseInt(localStorage.getItem('userId')!);
  notifications: any[] = [];
  showNotifications: boolean = false;
  mode: 'light' | 'dark' = 'light';
  private subscription: Subscription = new Subscription();

  constructor(private serverListener: WebSocketServiceService) {}

  ngOnInit() {
    this.serverListener.connect(this.currentUserId);
    this.subscription.add(
      this.serverListener.notifications$.subscribe((notification) => {
        console.log('Notification received:', notification);
        this.notifications.unshift(notification);
      })
    );

    // Set initial mode based on local storage or default to light
    const savedMode = localStorage.getItem('mode');
    this.mode = savedMode === 'dark' ? 'dark' : 'light';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleMode() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('mode', this.mode);
  }
}