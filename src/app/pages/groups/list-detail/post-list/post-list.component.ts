import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupPost } from 'src/app/shared/models/GroupPost';
import { Groups } from 'src/app/shared/models/Groups';
import { User } from 'src/app/shared/models/User';
import { Comment } from 'src/app/shared/models/Comment';
import { CommentService } from 'src/app/shared/services/comments.service';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  @Input() post?: GroupPost
  @Input() me?: User;
  @Input() members?: User [];
  @Input() group?: Groups;

  like?: Array<string>=[];
  isShowComments: boolean= false;
  postComments: Array<Comment>=[];
  postImage?: any;


  profilePic?: any;
  creator?: User;



  constructor(
    private postService: GrouppostService,
    private imageService: ImageService,
    private userService: UserService,
    private commentService: CommentService
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

isModerator(){
  if (this.group && this.me) {
    return !!this.group.moderators?.some(member => member.id === this.me?.id);
  }
  return false;
}

getProfilePic(creator: User) {
  if(creator.image)
  this.imageService.loadImage(creator.image).subscribe(profpic => {
    this.profilePic = profpic;
  });
  
}


  
  isLikedByMe(post: GroupPost) {
    if(this.me?.id !== undefined){
    return post.like && post.like.includes(this.me?.id);
    }
    return false;
    }
  
  toggleLike(post: GroupPost) {
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

  deletePost(post: GroupPost) {
    if (post.creator === this.me?.id) {
      this.postService.delete(post.id);
  
      if (post.comments && post.comments.length > 0) {
        for (let i = 0; i < post.comments.length; i++) {
          const commentId = post.comments[i].id;
          if (commentId) {
            this.commentService.delete(commentId)
          }
        }
      }
    }
  }
  

   findComments(post: GroupPost){
    this.commentService.getAllCommentWID(post.id).subscribe(comments =>{
      this.postComments = comments;
    })
   this.isShowComments ? this.isShowComments = false : this.isShowComments = true;
   }

   findCommentUser(comment: Comment){
     if(this.members && comment!==undefined)
     for(let user of this.members){
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
     const comment: Comment ={
       id: '',
       postid: id,
       from: this.me?.id, 
       comment :  this.commentForm.get("comment")?.value as string,
       date: new Date().getTime(),
       like: [],
       groupid: this.group?.id ? this.group?.id : '',
     }
     this.commentService.createComment(comment).then(_=> {
     }).catch(error => {
       console.error(error);
     });
     this.postComments?.push(comment)
     if(this.postComments){
     this.postService.addComment(id,this.postComments)
     this.commentForm.reset()
     }
 }
}
