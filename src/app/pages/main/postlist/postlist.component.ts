import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { Image } from 'src/app/shared/models/Image';
import { Comment } from 'src/app/shared/models/Comment'
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/shared/services/comments.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  me?:User; 
  post?:Post;
  profilePic?: Image;

  isupdate: boolean = false;
  newcommentid?: string;
  isucpid?: string;
  updatePost?: Post;
  addcomment: boolean = false;
  myposts: Array<Post>=[];
  allposts: Array<Post>=[];
  alluser: Array<User>=[];
  like?: Array<string>=[];
  addlike?: boolean=false;
  likeC?: Array<string>=[];
  comments?: Array<string>=[];
  commentList?: Array<Comment>=[];

  commentCreator?: Array<User>=[];


  commentForm = new FormGroup({
    comment :   new FormControl(),
  })

  updateForm = new FormGroup({
    post :   new FormControl(),
  })


  constructor(
    private userService: UserService,
    private postService: PostService,
    private imageService: ImageService,
    private commentService: CommentService,
    private afs: AngularFirestore,
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
      this.me= user;
      this.profPic();
    })
    
    this.commentService.getAllComment().subscribe(comments =>{
      this.commentList = comments
    })

      if(this.commentList?.length)
      for(let i=0;i<this.commentList?.length;i++){
        this.commentCreators(this.commentList[i])      
      }
  }

  commentCreators(comment: Comment){
    if(comment.from)
    this.userService.getById(comment.from)?.subscribe(user =>{
      if(user && this.commentCreator?.indexOf(user)===-1)
      this.commentCreator?.push(user);
    })
  }

  commentCont(postid: string){
    if(this.addcomment){
    this.addcomment = false;
    }else{
      this.addcomment = true;
    }
    this.isucpid=postid
  }

  profPic(){
    if(this.me && this.me.image)
      this.imageService.loadImage(this.me?.image).subscribe(image=>{
         this.profilePic=image;
         console.log(this.profilePic)
         })
  }

  addLikeC(userid :string,comment: Comment){
    this.likeC = comment.like
    if(comment.like?.indexOf(userid)===-1 && comment.id && this.likeC){
      this.likeC?.push(userid)
      this.commentService.addLike(comment.id,this.likeC); 
  }
  }

  removeLike(userid :string,post: Post){
    this.like=post.like
    if(this.like){
    this.like.splice(this.like?.indexOf(userid),1)
    this.postService.addLike(post.id,this.like); 
  }
}
  removeLikeC(userid :string,comment: Comment){
  this.likeC=comment.like
  console.log(this.likeC)
  if(this.likeC && comment.id){
  this.likeC.splice(this.likeC?.indexOf(userid),1)
  this.commentService.addLike(comment.id,this.likeC); 
}
}

  indexOf(post: Post,id: string){
    if(post.like?.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }

  CindexOf(comment: Comment,id: string){
    if(comment.like?.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }
  
  deletePost(post: Post){
    if(post.creator === this.me?.id){
      this.postService.delete(post.id)
      if(post.comments && post.comments?.length>0){
        for(let i=0;i<post.comments?.length;i++){
          this.commentService.delete(post.comments[i])
        }
      }
    }
  }
  updateCont(post: Post){
    this.updatePost=post
    this.isucpid=post.id;
    if(this.isupdate){
      this.isupdate=false
    }else{
      this.isupdate=true;
    }
  }
  updatethisPost(){
    if(this.updatePost?.post)
    this.updatePost.post = this.updateForm.get("post")?.value as string,
    this.postService.update(this.updatePost)
    this.isupdate=false;
  }

}
