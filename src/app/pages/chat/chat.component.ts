import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  me?: User;
  friends?: Array<User> =[];
  chosenFriend?: User;
  

  
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ){}
  
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
      if(this.me?.friends?.length){
        for (let i = 0; i < this.me?.friends.length; i++) {
          this.userService.getById(this.me.friends[i]).subscribe(friend=>{
            if(friend)
            this.friends?.push(friend)
          })
        } 
      } 
    })
  }
  
  getAllFriends(){
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
      if(this.me?.friends?.length){
        for (let i = 0; i < this.me?.friends.length; i++) {
          this.userService.getById(this.me.friends[i]).subscribe(friend=>{
            if(friend)
            this.friends?.push(friend)
          })
        } 
      } 
    })
  }

  loadChat(friend: any){
    this.chosenFriend = friend
  }
}
