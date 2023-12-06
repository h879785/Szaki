import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { Comment } from 'src/app/shared/models/Comment';
import { CommentService } from 'src/app/shared/services/comments.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit,OnDestroy{
  @Input() post?: Post; 
  @Input() me?: User | undefined;
  @Input() alluser?: User [];
  like?: Array<string>=[];
  isShowComments: boolean= false;
  postComments: Comment[]=[];
  postImage?: any;
  newcommentid?: string;
  comments?: Array<string>=[];


  profilePic?: any;
  creator?: User;



  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private imageService: ImageService,
    private userService: UserService,
    private afs: AngularFirestore,

  ) {}

  ngOnInit(): void {
    if(this.post && this.post.image && this.post.creator){
    this.imageService.loadImage(this.post.image).subscribe(image=>{
      this.postImage = image;
    })
    this.findComments(this.post)
  }
  if(this.post?.creator){
  this.userService.getById(this.post.creator).subscribe(user =>{
    this.creator =user;
    if(this.creator?.image)
    this.imageService.loadImage(this.creator.image).subscribe(image =>{
      this.profilePic = image
    })
  })
  }
}



getProfilePic(creator: User) {
  if(creator.image)
  this.imageService.loadImage(creator.image).subscribe(profpic => {
    this.profilePic = profpic;
  });
  
}


  
  isLikedByMe(post: Post) {
    if(this.me?.id !== undefined){
    return post.like && post.like.includes(this.me?.id);
    }
    return false;
    }
  
  toggleLike(post: Post) {
    if (!post.like) {
      post.like = [];
    }
    if(this.me?.id !== undefined){
     let index = post.like.indexOf(this.me?.id);
    
    if (index === -1) {
      post.like.push(this.me?.id);
      this.postService.addLike(post.id,post.like); 
    } else {
      post.like.splice(index, 1);
      this.postService.addLike(post.id,post.like); 
    }
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

  findComments(post: Post){
    this.commentService.getAllCommentWID(post.id).subscribe(comments =>{
      this.postComments = comments;
    })
    this.isShowComments ? this.isShowComments = false : this.isShowComments = true;
  }

  findCommentUser(comment: Comment){
    if(this.alluser && comment!==undefined)
    for(let user of this.alluser){
      if(user.id === comment.from){
        return user;
      }
    }
    return undefined;
  }

  commentForm = new FormGroup({
    comment :   new FormControl(),
  })

  addComment(id: string){
    this.newcommentid = this.afs.createId();

    const comment: Comment ={
      id: this.newcommentid,
      postid: id,
      from: this.me?.id, 
      comment :  this.commentForm.get("comment")?.value as string,
      date: new Date().getTime(),
      like: [],
    }
    this.commentService.createComment(comment).then(_=> {
    }).catch(error => {
      console.error(error);
    });
    this.comments?.push(this.newcommentid)
    if(this.comments){
    this.postService.addComment(id,this.comments)
    this.commentForm.reset()
    }
}


  ngOnDestroy(){
    
  }
}

