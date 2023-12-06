import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { Image } from '../../shared/models/Image';
import { UserService } from '../../shared/services/user.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { Post } from 'src/app/shared/models/Post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    selectedUser?: User;
    selectedUserId?: any;
    selectedUserPosts?: Array<Post>;
    myPosts?: Array<Post>;
    me?:User;
    profilePic? :any;
    users: Array<User> = [];  
    friend: Array<string>=[];
    defaultPP?: Image;
    post?: Post;
    newcomment?: Boolean;
    isup?: Boolean;
    isbp?:Boolean;
    birthdate? :Date;
    malePP?: Image;
    femalePP?: Image;
    nbPP?: Image;

    workForm = new FormGroup({
      work :   new FormControl(),
    })
    birthplaceForm = new FormGroup({
      birthplace :   new FormControl(),
    })
    
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private imageService: ImageService,
    private postService: PostService,
  ) {}

  ngOnInit():void{
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getAll().subscribe(user => {
      this.users = user;
    })

    this.userService.getById(me.uid)?.subscribe(user =>{
      this.me= user;
      if(this.me?.id){
      this.postService.getMyPosts(this.me.id).subscribe(myposts=>{
        this.myPosts = myposts;
      })
      }
      if(this.me?.image)
      this.imageService.loadImage(this.me?.image).subscribe(profpic=>{
        this.profilePic = profpic;
       })
    })

    this.route.params.subscribe((params: Params) => {
      this.selectedUserId = params['id'];
      console.log( params['id'])
      if (typeof this.selectedUserId === 'string') {
        this.userService.getById(this.selectedUserId).subscribe((user: User | undefined) => {
          if (user && user.id) {
            this.selectedUser = user;
            this.postService.getMyPosts(user.id).subscribe(myposts=>{
              this.selectedUserPosts = myposts;
            })
            if(this.selectedUser?.image)
            this.imageService.loadImage(this.selectedUser.image).subscribe(profpic=>{
              this.profilePic = profpic;
             })
          }
        });
      }
  })
}


  deletePost(id :string){
    this.postService.delete(id);
  }
  updateUser(){
  //   const updatedMe: User=({
  //     id: this.me?.id,
  //     email: this.me?.email,
  //     name: {
  //         firstname: this.me?.name?.firstname,
  //         lastname: this.me?.name?.lastname,
  //     },
  //     gender: this.me?.gender,
  //     birthdate: this.me?.birthdate,
  //     birthplace: this.me?.birthplace || this.birthplaceForm.get("birthplace")?.value as string ||'',
  //     friends: this.me?.friends,
  //     work: this.me?.work || this.workForm.get("work")?.value as string || '',
  //     hobbies: '',
  //   })
  //  this.userService.update(updatedMe)
  //  this.isup=false
  }
  
  isUpdate(){
    if(this.isup){
      this.isup=false
    }else{
    this.isup=true
    }
  }

  isUpdatebp(){
    if(this.isbp){
      this.isbp=false
    }else{
    this.isbp=true
    }
  }

  newComment(){
    if(this.newcomment){
      this.newcomment= false
    }else{
    this.newcomment=true;
    }
  }

  /*addComment(postId: string){
      const newComment: Comment = {
        id: '',
        postid: postId,
        from: this.me?.id,
        comment: this.commentForm.get("comment")?.value as string,
        date: new Date().getTime(),
        like: [],
      };
  
      this.commentService.createComment(newComment).then(_=>{
        console.log("sikeres comment! ")
      }).catch(error=>{
        console.log(error)
      })
  }*/

  addComment(post: string){
    
  }

  likePost(postId: string){
  //  this.postService.getPost(postId)?.subscribe(post =>{
   //   this.post = post;
   // })
  }

  addFriend(friendId: string){
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if(this.me?.friends?.indexOf(friendId)===-1){
      this.friend.push(friendId);
      this.userService.addFriend(me.uid,this.friend);
    }
  }
  indexOf(id: string){
    if(this.me?.friends?.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }


}
