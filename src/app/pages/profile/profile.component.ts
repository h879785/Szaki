import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
export class ProfileComponent implements OnInit,OnChanges {
  
    me?:User;
    users: Array<User> = [];  
    friend: Array<string>=[];
    defaultPP?: Image;
    myposts: Array<Post>=[];

  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
    })
    this.imageService.loadImage("images/default_boy.png").subscribe(image=>{
      this.defaultPP=image;
    })
    this.postService.getMyPosts(me.uid)?.subscribe(mypost =>{
      this.myposts = mypost;
     })

  }
  deleteUser(id :string){
    this.userService.delete(id)
  }
  updateUser(){
   
  }
  addFriend(friendId: string){
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if(this.me?.friends?.indexOf(friendId)===-1){
      this.friend.push(friendId);
      console.log(this.friend)
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
  ngOnChanges():void{
      
  }

}
