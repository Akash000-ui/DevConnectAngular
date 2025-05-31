// import { Component } from '@angular/core';
// import { AngularToSpringServiceService } from '../angular-to-spring-service.service';

// @Component({
//   selector: 'app-show-posts',
//   standalone: false,
//   templateUrl: './show-posts.component.html',
//   styleUrl: './show-posts.component.css'
// })
// export class ShowPostsComponent {

//   constructor(private service : AngularToSpringServiceService) { }

//   posts: any[] = [];
//   ngOnInit(): void {
//     this.service.getPosts().subscribe((res) => {
//       console.log("Posts fetched successfully");
//       console.log(res);
//       this.posts = res.data;
//     }, (error) => {
//       console.error("Error fetching posts:", error);    
//     });
//   }
  
//   addLikes(userId:number , postId:number ): void {
//     const likeDetails = {
//       user_like_id: userId,
//       post_like_id: postId
//     }
//     this.service.addLike(likeDetails).subscribe((data) => {
//       this.posts.forEach((post) => {
//         if (post.postId === postId) {
//           post.likesCount = data.likesCount;
//           post.dislikesCount = data.dislikesCount;
//         }
//       })
//     });
//   }

//   addDisLikes(userId:number , postId:number ): void {
//     const dislikeDetails = {
//       user_like_id: userId,
//       post_like_id: postId
//     }
//     this.service.addDislike(dislikeDetails).subscribe((data) => {
//       this.posts.forEach((post) => {
//         if (post.postId === postId) {
//           post.dislikesCount = data.dislikesCount;
//           post.likesCount = data.likesCount;
//         }
//       })
//     });
//   }


//   commentMap: { [postId: number]: string } = {};

//   addComment(client_id: number, postId: number): void {
//     const authorName = localStorage.getItem('AuthorName');
//     const content = this.commentMap[postId];

//     if (!content || content.trim() === '') {
//       console.warn('Empty comment. Aborting.');
//       return;
//     }

//     const commentDetails = {
//       content: content.trim(),
//       authorName: authorName,
//       comment_user_id: client_id,
//       post_comment_id: postId
//     };

//     this.service.addComment(commentDetails).subscribe(
//       (res) => {
//         console.log("Comment added successfully", res);
//         this.service.getPosts().subscribe((response) => {
//           this.service.getPosts().subscribe((res) => {
//             console.log("Posts fetched successfully");
//             console.log(res);
//             this.posts = res.data;
//           }, (error) => {
//             console.error("Error fetching posts:", error);    
//           });
//           this.commentMap[postId] = '';
//         });
//       },
//       (error) => {
//         console.log("Failed to add comment", error);
//       }
//     );
//   }

//   commentVisibility: { [key: string]: boolean } = {};

// toggleCommentVisibility(postId: string) {
//   this.commentVisibility[postId] = !this.commentVisibility[postId];
// }

// }

import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';

@Component({
  selector: 'app-show-posts',
  standalone: false,
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent {
  posts: any[] = [];
  isLoading = true; // New flag for skeletons
  commentMap: { [postId: number]: string } = {};
  commentVisibility: { [key: string]: boolean } = {};

  constructor(private service: AngularToSpringServiceService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(
      (res) => {
        console.log("Posts fetched successfully" , res);
        setTimeout(() => {
        this.posts = res.data;
        this.isLoading = false; // Hide skeleton after delay
      }, 2000);
        // this.posts = res.data;
        // this.isLoading = false; // Stop skeletons
      },
      (error) => {
        console.error("Error fetching posts:", error);
        this.isLoading = false;
      }
    );
  }

  addLikes(userId: number, postId: number): void {
    const likeDetails = { user_like_id: userId, post_like_id: postId };
    this.service.addLike(likeDetails).subscribe((data) => {
      this.posts.forEach((post) => {
        if (post.postId === postId) {
          post.likesCount = data.likesCount;
          post.dislikesCount = data.dislikesCount;
        }
      });
    });
  }

  addDisLikes(userId: number, postId: number): void {
    const dislikeDetails = { user_like_id: userId, post_like_id: postId };
    this.service.addDislike(dislikeDetails).subscribe((data) => {
      this.posts.forEach((post) => {
        if (post.postId === postId) {
          post.dislikesCount = data.dislikesCount;
          post.likesCount = data.likesCount;
        }
      });
    });
  }

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
      comment_user_id: client_id,
      post_comment_id: postId
    };

    this.service.addComment(commentDetails).subscribe(
      () => {
        this.service.getPosts().subscribe((res) => {
          this.posts = res.data;
          this.commentMap[postId] = '';
        });
      },
      (error) => {
        console.log("Failed to add comment", error);
      }
    );
  }

  toggleCommentVisibility(postId: string) {
    this.commentVisibility[postId] = !this.commentVisibility[postId];
  }
}
