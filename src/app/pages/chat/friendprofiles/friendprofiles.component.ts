import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friendprofiles',
  templateUrl: './friendprofiles.component.html',
  styleUrls: ['./friendprofiles.component.scss']
})
export class FriendprofilesComponent implements OnInit{
  @Input() me?: User;
  @Input() friendsInput?: Array<User>;
  @Input() myprofilePic?: any
  @Input() unknownUsers?: Array<User>
  chosenFriend?: User;
  searchtext: any = "";
  unknownChatCounter: number = 0
  allUser?: Array<User>;
  isSwap?: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ){
  }
  ngOnInit() {
    this.userService.getAll().subscribe(all => {
      this.allUser = all;
      this.unknownUsers = this.allUser.filter(user => !this.isFriend(user.id));
  
      this.unknownUsers.forEach(unknownUser => {
        if(this.me && this.me.id && unknownUser && unknownUser.id){
        this.messageService.getUnknownMessage(this.me.id, unknownUser.id).subscribe(chat => {
          if (chat.length>0) {
            this.unknownChatCounter++;
          } else {
            if(this.unknownUsers){
            this.unknownUsers = this.unknownUsers.filter(user => user.id !== unknownUser.id);
            }
          }
        });
      }
      });
    });
  }
  
  
  isFriend(userid: string | undefined){
    if(userid){
    return this.me?.friends?.includes(userid);
    }
    return false;
  }

  IsSwap(){
    this.isSwap ? this.isSwap = false : this.isSwap = true;
  }
}
