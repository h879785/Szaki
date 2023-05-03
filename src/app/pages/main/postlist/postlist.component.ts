import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { Image } from 'src/app/shared/models/Image'
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  me?:User; 
  post?:Post;

  myposts: Array<Post>=[];
  allposts: Array<Post>=[];
  alluser: Array<User>=[];
  like?: Array<string>=[];
  defaultPP?: Image;
  comments: Array<Comment>=[];
  commentsid: Array<string>=[];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private imageService: ImageService
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
    this.imageService.loadImage("images/default_boy.png").subscribe(image=>{
      this.defaultPP=image;
    })

    this.userService.getById(user.uid)?.subscribe(user =>{
      this.me= user;
    })
  }

  addLike(post: Post){
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if(post.like?.indexOf(me.uid)===-1 ){
      this.like?.push(me.uid);
      if(this.like)
      this.postService.addLike(post.id,this.like); 
  }
  }

  removeLike(post: Post){
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.like=post.like
    const index = this.like?.indexOf(me.uid)
    if(index &&  this.like ){
    this.like.splice(index,1)
      this.postService.addLike(post.id,this.like); 
  }
}

  indexOf(post: Post,id: string){
    if(post.like?.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }

  
  
  deletePost(){

  }
  updatePost(){

  }
  

}
