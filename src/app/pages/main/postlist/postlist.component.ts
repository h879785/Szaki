import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  user?:User; 
  post?:Post;

  myposts: Array<Post>=[];
  allposts: Array<Post>=[];
  alluser: Array<User>=[];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(allpost => {
      this.allposts = allpost
    })
    this.userService.getAll().subscribe(user =>{
      this.alluser= user;
    })
    
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  
    this.postService.getMyPosts(user.uid)?.subscribe(mypost =>{
     this.myposts = mypost;
    })

    this.userService.getById(user.uid)?.subscribe(user =>{
      this.user= user;
    })
  }

  
  deletePost(){

  }
  updatePost(){

  }
  

}
