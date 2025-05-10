import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(private router:Router) { }


  confirmLogout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImageUrl');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userSkills');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.router.navigate(['/home']); // or any route you want to go back to
  }
}
