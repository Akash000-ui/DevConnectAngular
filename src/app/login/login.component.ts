import { Component, OnInit } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private service: AngularToSpringServiceService , private fb:FormBuilder , private router:Router) { }

  googleToken: string | null = null;
  loginForm !: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['' , [Validators.required , Validators.email]],
      password: ['' , [Validators.required , Validators.minLength(6)]]
    });

     // google OAuth2.0
     google.accounts.id.initialize({
      client_id: '96934569111-4gg4q9mkhei39id5bvm830b6e5esq6pg.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.googleToken = response.credential;
    this.service.loginGoogleUser({ id_token: this.googleToken }).subscribe(
      response => {
        console.log("Login successful", response);
        localStorage.setItem('userId' , response.userId);
        console.log("USER ID : " + response.userId);
        localStorage.setItem('jwt' , response.token);
        localStorage.setItem('AuthorName' , response.AuthorName);
        this.router.navigate(['/home']);
      },
      error => {
        console.log("Login failed", error);
      }
    );
  }

  onSubmit() {
      if (this.loginForm.valid) {
          console.log(this.loginForm.value);
          this.service.loginUser(this.loginForm.value).subscribe(
            response => {
              console.log("Login successful", response);
              localStorage.setItem('userId' , response.userId);
              localStorage.setItem('jwt' , response.token);
              localStorage.setItem('AuthorName' , response.AuthorName);
              this.router.navigate(['/home']);
            },
            error => {
              console.log("Login failed", error);
            }
          );
      }
  }


}