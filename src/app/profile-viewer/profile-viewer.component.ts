import { Component } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-viewer',
  standalone: false,
  templateUrl: './profile-viewer.component.html',
  styleUrl: './profile-viewer.component.css'
})
export class ProfileViewerComponent {

  userDetails: any = {}
  posts: any[] = [];

  constructor(private service: AngularToSpringServiceService , private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      const userId = +params['id'];
      console.log("User ID from query params:", userId);
      if (userId) {
        this.getUserDetails(userId);
      } else {
        console.error('User ID not found in query parameters');
      }
    })
  }


  getUserDetails(id: number) {
    this.service.getuserDetails(id).subscribe((response) => {
      console.log("_____________________________________________________________________");
      console.log("User details fetched successfully:");

      console.log(response);
      this.userDetails = response.user;
      this.posts = this.userDetails.posts;
    }, (error) => {
      console.error("Error fetching user details:", error);
      console.error(error);
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


  commentMap: { [postId: number]: string } = {};

  addComment(client_id: number, postId: number): void {
    const authorName = localStorage.getItem('AuthorName');
    const content = this.commentMap[postId];

    if (!content || content.trim() === '') {
      console.warn('Empty comment. Aborting.');
      return;
    }

    const commentDetails = {
      content: content.trim(),
      authorName: authorName,
      comment_user: {
        id: client_id
      },
      post_comment: {
        id: postId
      }
    };

    this.service.addComment(commentDetails).subscribe(
      (res) => {
        console.log("Comment added successfully", res);
        this.service.getPosts().subscribe((response) => {
          this.userDetails.posts = response;
          // Clear the comment after successful submission
          this.commentMap[postId] = '';
        });
      },
      (error) => {
        console.log("Failed to add comment", error);
      }
    );
  }

  commentVisibility: { [key: string]: boolean } = {};

toggleCommentVisibility(postId: string) {
  this.commentVisibility[postId] = !this.commentVisibility[postId];
}

}
