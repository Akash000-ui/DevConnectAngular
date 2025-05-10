import { Component } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  userDetails: any;
  userId!: number;
  selectedFile: File | null = null;
  selectedPost: any = null;

  constructor(private service: AngularToSpringServiceService) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.service.getuserDetails(this.userId).subscribe(
        (response) => {
          this.userDetails = response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  onSkillsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userDetails.user.skills = input.value.split(',').map((skill: string) => skill.trim());
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  updateProfile() {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify({
      name: this.userDetails.user.name,
      bio: this.userDetails.user.bio,
      skills: this.userDetails.user.skills,
      email: this.userDetails.user.email, // include email if backend requires it
      imageUrl: this.userDetails.user.imageUrl || null
    })], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.service.updateUserWithImage(this.userId, formData).subscribe(
      (response) => {
        console.log('Profile updated:', response);
        alert('Profile updated successfully!');
        this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.service.getuserDetails(this.userId).subscribe(
        (response) => {
          this.userDetails = response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
      },
      (error) => {
        console.error('Update failed:', error);
        alert('Failed to update profile.');
      }
    );
  }

  editPost(post: any) {
    this.selectedPost = { ...post }; // clone to avoid direct binding
  }

  cancelEdit() {
    this.selectedPost = null;
  }

  updatePost( postId: number , post: any) {
    this.service.updatePost( postId , post).subscribe(
      (res) => {
        this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.service.getuserDetails(this.userId).subscribe(
        (response) => {
          this.userDetails = response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
    this.selectedPost = null; 
    },
      (err) => {
        console.error('Error updating post:', err);
        alert('Failed to update post.');
      }
    );
  }


  deletePost(postId: number) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    this.service.deletePost(postId).subscribe(
      (res) => {
        this.userDetails.user.posts = this.userDetails.user.posts.filter((p: any) => p.postId !== postId);
        alert('Post deleted successfully!');
      },
      (error) => {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
      }
    );
  }
}
