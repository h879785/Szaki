import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { Image } from 'src/app/shared/models/Image';
import { UserService } from 'src/app/shared/services/user.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit{

  me?: User;
  users: Array<User> = [];  
  friend: Array<string>=[];
  malePP?: Image;
  femalePP?: Image;
  nbPP?: Image;
  
constructor(
  private userService: UserService,
  private imageService: ImageService

)
{}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
    })  
    this.userService.getAll().subscribe(users =>{
      this.users=users;
    })
    this.imageService.loadImage("images/default_boy.png").subscribe(image=>{
      this.malePP=image;
    })
    this.imageService.loadImage("images/default_girl.png").subscribe(image=>{
      this.femalePP=image;
    })
    this.imageService.loadImage("images/universe.png").subscribe(image=>{
      this.nbPP=image;
    })
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
