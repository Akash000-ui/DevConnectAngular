import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { HttpClient } from '@angular/common/http';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Fixed property name
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  page: number = 1;
  googleToken: string | null = null;

  constructor(private fb: FormBuilder, private service: AngularToSpringServiceService , private http:HttpClient , private cdr:ChangeDetectorRef , private router:Router ) {}

  ngOnInit(): void {

    
    // Initialize the form with validation rules
  
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6) , this.passwordMatchValidator.bind(this)]],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
      bio: ['', [Validators.required, Validators.minLength(10)]]
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

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }
  
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  

  passwordMatchValidator(control: any): { [key: string]: boolean } | null {
    if (this.registrationForm) {
      const password = this.registrationForm.get('password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return { mustMatch: true };
      }
    }
    return null;
  }
  

  handleCredentialResponse(response: any): void {
    this.googleToken = response.credential;
    console.log("ID Token:", this.googleToken);
    this.page = 2;
    this.cdr.detectChanges();
  }

  f() {
    return this.registrationForm.controls;
  }

  nextPage() {
    if (
      this.f()['name'].valid &&
      this.f()['email'].valid &&
      this.f()['password'].valid &&
      this.f()['confirmPassword'].valid
    ) {
      this.page = 2;
      console.log(this.registrationForm.value);
    } else {
      this.f()['name'].markAsTouched();
      this.f()['email'].markAsTouched();
      this.f()['password'].markAsTouched();
      this.f()['confirmPassword'].markAsTouched();
    }
  }
  
  onSubmit() {

    if(this.googleToken){
      const payload = {
        token: this.googleToken,
        skills: this.registrationForm.value.skills,
        bio: this.registrationForm.value.bio
      };
      console.log("PAYLOAD"+payload);
      this.service.registerGoogleUser(payload).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']).catch(err => console.error('Navigation error:', err));
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
    else{
    if (this.f()['skills'].invalid || this.f()['bio'].invalid) {
      console.log(this.registrationForm.value);
      this.f()['skills'].markAsTouched();
      this.f()['bio'].markAsTouched();
      return;
    }

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.service.registerUser(this.registrationForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']).catch(err => console.error('Navigation error:', err));
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
}