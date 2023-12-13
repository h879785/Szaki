import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  @Input() me?: User;
  @Input() selectedUser?: User;
  @Input() profilePic: any;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    }

    isFriend(){
      if(this.selectedUser && this.selectedUser.id){
      return this.me?.friends?.includes(this.selectedUser.id);
      }
      return false;
    }


    addFriend(){
      if(this.me?.id && this.selectedUser?.id &&  this.me?.friends?.indexOf(this.selectedUser.id)===-1){
        this.me.friends.push(this.selectedUser.id);
        this.userService.addFriend(this.me.id, this.me.friends);
      }
    }

    removeFriend(){
      if(this.me?.id && this.me.friends && this.selectedUser?.id){
        const index = this.me?.friends?.indexOf(this.selectedUser.id)
        this.me.friends.slice(index,1);
        this.userService.addFriend(this.me.id, this.me.friends);
      }
    }
}
