import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb:FormBuilder , private service:AngularToSpringServiceService) {}
}
