import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {


  constructor(private service: AngularToSpringServiceService , private fb:FormBuilder){}

  post!:FormGroup;

  selectedFile : File | null = null;

  ngOnInit(): void {
    this.post = this.fb.group({
      title:['' , [Validators.required , Validators.minLength(5)]],
      content:['' , [Validators.required , Validators.minLength(10)]], 
      authorName:[localStorage.getItem('AuthorName')],
      authorId:[localStorage.getItem('userId')],
    });

    console.log(this.post.value);
    console.log(localStorage.getItem('AuthorName'));
    console.log(localStorage.getItem('userId'));
  }

  onFileSelected(event: any) {
    const file= event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.post.get('title')?.value);
    formData.append('content', this.post.get('content')?.value);
    formData.append('authorName', this.post.get('authorName')?.value);
    formData.append('authorId', this.post.get('authorId')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    this.service.addPost(formData).subscribe((response) => {
      console.log(response);
      alert("Post added successfully");
    });
  }

}
