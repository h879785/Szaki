import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { Comment } from 'src/app/shared/models/Comment';
import { CommentService } from 'src/app/shared/services/comments.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() me?: User;
  @Input() selectedUser?: User;
  @Input() post?: Post;
  @Input() profilePic?: any;

  isShowComments?: boolean= false;
  postComments: Array<Comment>=[];
  postImage?: any;
  newcommentid?: string;
  comments?: Array<string>=[];

  like?: Array<string>=[];
  addlike?: boolean=false;
  likeC?: Array<string>=[];

  constructor(
    private postService: PostService,
    private imageService: ImageService,
    private commentService: CommentService,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    if(this.post?.image){
      this.imageService.loadImage(this.post.image).subscribe(image =>{
        this.postImage = image;
      })
    }
  }

  getProfilePic(creator: User) {
    if(creator.image)
    this.imageService.loadImage(creator.image).subscribe(profpic => {
      this.profilePic = profpic;
    });
    
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
  
    findComments(post: Post){
      this.commentService.getAllCommentWID(post.id).subscribe(comments =>{
        this.postComments = comments;
      })
      this.isShowComments ? this.isShowComments = false : this.isShowComments = true;
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

  profPic(){
    if(this.me && this.me.image)
      this.imageService.loadImage(this.me?.image).subscribe(image=>{
         this.profilePic=image;
         console.log(this.profilePic)
         })
  }



  removeLike(userid :string,post: Post){
    this.like=post.like
    if(this.like){
    this.like.splice(this.like?.indexOf(userid),1)
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
  isLikedByMe(post: Post) {
    if(this.me?.id !== undefined){
    return post.like && post.like.includes(this.me?.id);
    }
    return false;
    }
}
