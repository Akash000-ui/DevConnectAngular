import { Component } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';

@Component({
  selector: 'app-show-posts',
  standalone: false,
  templateUrl: './show-posts.component.html',
  styleUrl: './show-posts.component.css'
})
export class ShowPostsComponent {

  constructor(private service : AngularToSpringServiceService) { }

  posts: any[] = [];
  ngOnInit(): void {
    this.service.getPosts().subscribe((data) => {
      console.log("Posts fetched successfully");
      console.log(data);
      this.posts = data;
    });
  }
  
  addLikes(userId:number , postId:number ): void {
    const likeDetails = {
      user_like_id: userId,
      post_like_id: postId
    }
    this.service.addLike(likeDetails).subscribe((data) => {
      this.posts.forEach((post) => {
        if (post.postId === postId) {
          post.likesCount = data.likesCount;
          post.dislikesCount = data.dislikesCount;
        }
      })
    });
  }

  addDisLikes(userId:number , postId:number ): void {
    const dislikeDetails = {
      user_like_id: userId,
      post_like_id: postId
    }
    this.service.addDislike(dislikeDetails).subscribe((data) => {
      this.posts.forEach((post) => {
        if (post.postId === postId) {
          post.dislikesCount = data.dislikesCount;
          post.likesCount = data.likesCount;
        }
      })
    });
  }
}
