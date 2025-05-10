import { Component } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: false,
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  sidebarOpen = false;

  userDetails: any = {};
  userId: number | null = null;

  constructor(private service: AngularToSpringServiceService , private route : Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId; // Convert string to number
      this.service.getUserDetailsProfile(this.userId).subscribe((response) => {
        console.log("User details fetched successfully:");
        console.log(response);
        this.userDetails = response.user;
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  navigateToProfile() {
    if(this.userId){
      console.log("Navigating to profile with ID:", this.userId);
      this.route.navigate(['/home/profile'], { queryParams: { id: this.userId } });
    }
  }
}