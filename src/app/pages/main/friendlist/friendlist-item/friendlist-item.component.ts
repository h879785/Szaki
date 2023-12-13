import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friendlist-item',
  templateUrl: './friendlist-item.component.html',
  styleUrls: ['./friendlist-item.component.scss']
})
export class FriendlistItemComponent implements OnInit {
  @Input() user?: User;
  @Input() me?: User;
  profilePic: any;
  friend: Array<string>=[];


  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
  ){}


  ngOnInit(){
    if(this.user?.image){
    this.imageService.loadImage(this.user?.image).subscribe(image =>{
      this.profilePic = image;
      })
    }
  }

  redirectToProfile(userid: string){
     this.router.navigate(['profile',userid]);
  }

  addFriend(friendId: string){
    if(this.me?.id && this.me?.friends?.indexOf(friendId)===-1){
      this.friend = this.me.friends
      this.friend.push(friendId);
      this.userService.addFriend(this.me.id,this.friend);
    }
  }


  indexOf(id: string | undefined) {
    if(id!==undefined){
    return this.me?.friends?.includes(id) === true;
    }
    return false;
  }
}
